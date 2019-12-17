<?php

namespace Modules\Chat\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Repositories\ChatRepository;
use Modules\Employees\Entities\Employee;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;
use Nwidart\Modules\Routing\Controller;

class ChatController extends Controller
{
    use Statusable;

    private $repository;

    public function __construct(ChatRepository $chatRepository)
    {
        $this->repository = $chatRepository;
    }

    public function index()
    {
        $user = auth()->user();

        $chats = $this->repository
            ->getChatsQuery($user)
            ->with(['employee', 'client'])
            ->withCount([
                'messages' => function($query) use ($user) {
                    $query->whereSeen(0)->whereFromClient($user instanceof Employee ? 0 : 1);
                }
            ])
            ->get()
            ->unique('id')
            ->values()
            ->map(function($chat) {
                return $this->formatChat($chat);
            });

        return $chats;
    }

    public function show($chat_id)
    {
        $chat = Chat::with(['employee', 'client', 'messages' => function($query) {
            return $query->limit(Chat::MESSAGES_LIMIT);
        }])->findOrFail($chat_id);

        $user = auth()->user();

        $idField = $user->isClient() ? 'client_id' : 'employee_id';

        if ($chat->$idField !== $user->id) {
            return $this->fail('chat not found');
        }

        $user = auth()->user();

        $chat->messages()
            ->whereFromClient($user instanceof Employee ? 0 : 1)
            ->update(['seen' => 1]);

        return $this->formatChatRoom($chat);
    }

    public function profileChat($receiver_id)
    {
        $user = auth()->user();
        $receiver = User::findOrFail($receiver_id);
        if ($chat = $this->repository->getChatByReceiverId($receiver_id, $user->id)) {
            return $this->formatChatRoom($chat);
        }

        return [
            'messages' => [],
            'receiver' => [
                'name' => $receiver->name,
                'id' => $receiver->id
            ],
            'id' => null
        ];
    }

    public function delete($chat_id)
    {
        $chat = Chat::findOrFail($chat_id);

        if ($chat) {
            $chat->delete();

            return $this->success('chat has been deleted');
        }

        return $this->fail('chat not found');
    }

    private function formatChat($chat)
    {
        $receiver = $this->getChatReceiver($chat);

        return [
            'id' => $chat->id,
            'unread_messages_count' => $chat->messages_count,
            'last_message_date' => $chat->last_message_date,
            'receiver' => [
                'id' => $receiver->id,
                'name' => $receiver->name,
            ]
        ];
    }

    private function formatChatRoom($chat)
    {
        $receiver = $this->getChatReceiver($chat);

        return [
            'messages' => isset($chat->messages) ? $chat->messages->toArray() : [],
            'receiver' => [
                'id' => $receiver->id,
                'name' => $receiver->name,
            ],
            'id' => $chat->id,
        ];
    }

    private function getChatReceiver($chat)
    {
        if (auth()->user()->is_employee) {
            return $chat->client;
        }

        return $chat->employee;
    }
}
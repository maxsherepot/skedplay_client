<?php

namespace Modules\Chat\Http\Controllers;

use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Repositories\ChatRepository;
use Modules\Chat\Services\ChatService;
use Modules\Employees\Entities\Employee;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;
use Nwidart\Modules\Routing\Controller;

class ChatController extends Controller
{
    use Statusable;

    private $repository;
    /**
     * @var ChatService
     */
    private $chatService;

    public function __construct(ChatRepository $chatRepository, ChatService $chatService)
    {
        $this->repository = $chatRepository;
        $this->chatService = $chatService;
    }

    public function index()
    {
        /** @var User $user */
        $user = auth()->user();

        $employee_id = func_get_args()[0] ?? null;

        $chats = $this->repository
            ->getChatsQuery($user, is_numeric($employee_id) ? (int) $employee_id : null)
            ->with(['employee', 'client'])
            ->withCount([
                'messages' => function($query) use ($user) {
                    $query->whereSeen(0)->whereFromClient($user->is_client ? 0 : 1);
                }
            ])
            ->get()
            ->unique('id')
            ->values()
            ->map(function($chat) {
                return $this->chatService->formatChat($chat);
            });

        return $chats;
    }

    public function show($chat_id)
    {
        $chat = Chat::with(['employee', 'client', 'messages' => function($query) {
            return $query->with('attachments')->limit(Chat::MESSAGES_LIMIT);
        }])->findOrFail($chat_id);

        $user = auth()->user();

        if ($user->is_client) {
            $chatMemberId = $user->id;
        } elseif ($user->is_employee) {
            $chatMemberId = $user->employee->id;
        } else {
            $chatMemberId = $chat->employee_id;

            if (!$user->employees_club_owners()->where('employees.id', $chatMemberId)->first()) {
                return $this->fail('chat not found');
            }
        }

        $idField = $user->is_client ? 'client_id' : 'employee_id';

        if ($chat->$idField !== $chatMemberId) {
            return $this->fail('chat not found');
        }

        $chat->messages()
            ->whereFromClient($user->is_client ? 0 : 1)
            ->update(['seen' => 1]);

        return $this->chatService->formatChatRoom($chat);
    }

    public function myChatsWithLastMessages()
    {
        /** @var User $user */
        $user = auth()->user();

        return $this->repository->getUserChatsWithLastMessages($user)
            ->filter(function(Chat $chat) {
                return $chat->lastMessage !== null;
            })
            ->map(function(Chat $chat) {
                $chat->last_message = $chat->lastMessage;

                return $chat;
            })
            ->values();
    }

    public function profileChat($receiver_id)
    {
        $user = auth()->user();
        $receiver = User::findOrFail($receiver_id);
        if ($chat = $this->repository->getChatByReceiverId($receiver_id, $user->id)) {
            return $this->chatService->formatChatRoom($chat);
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
}

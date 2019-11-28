<?php

namespace Modules\Chat\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Repositories\ChatRepository;
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
        $chats = auth()->user()->chats()->with(['receiver', 'creator', 'lastMessage'])->get()->map(function($chat) {
            return $this->formatChat($chat);
        });

        return $chats;
    }

    public function show($chat_id)
    {
        $chat = Chat::with(['creator', 'receiver', 'messages' => function($query) {
            return $query->limit(Chat::MESSAGES_LIMIT);
        }])->findOrFail($chat_id);
        $user = auth()->user();
        if ($chat->receiver_id !== $user->id && $chat->id !== $user->id) {
            return $this->fail('chat not found');
        }

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
        $chat = auth()->user()->chats()->where('id', $chat_id);
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
            'last_message' => $chat->lastMessage->toArray(),
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
            'messages' => $chat->messages->toArray(),
            'receiver' => [
                'id' => $receiver->id,
                'name' => $receiver->name,
            ],
            'id' => $chat->id,
        ];
    }

    private function getChatReceiver($chat)
    {
        if ($chat->receiver_id === user()->id()) {
            return $chat->creator;
        } else if($chat->creator_id === user()->id()){
            return $chat->receiver;
        }

        return $this->fail('chat not found!');
    }
}
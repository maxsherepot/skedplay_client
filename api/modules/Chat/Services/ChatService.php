<?php

namespace Modules\Chat\Services;

use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ChatService
{
    public function formatChat($chat): array
    {
        $receiver = $this->getChatReceiver($chat);

        $avatar = $receiver->avatar;

        if (!$avatar) {
            $avatar = $receiver->toArray()['avatar'] ?? null;
            $avatar = Media::find($avatar['id']);
        }

        return [
            'id' => $chat->id,
            'client_id' => $chat->client_id,
            'employee_id' => $chat->employee_id,
            'unread_messages_count' => $chat->messages_count,
            'last_message_date' => $chat->last_message_date,
            'receiver' => [
                'id' => $receiver->id,
                'name' => $receiver->name,
                'avatar' => $avatar,
            ]
        ];
    }

    public function formatChatRoom($chat): array
    {
        $receiver = $this->getChatReceiver($chat);

        $clientAvatarId = $chat->client->toArray()['avatar']['id'] ?? null;

        return [
            'client_id' => $chat->client_id,
            'client_avatar' => $clientAvatarId ? Media::find($clientAvatarId) : null,
            'employee_id' => $chat->employee_id,
            'employee_avatar' => $chat->employee->avatar,
            'messages' => $chat->messages,
            'receiver' => [
                'id' => $receiver->id,
                'name' => $receiver->name,
            ],
            'id' => $chat->id,
        ];
    }

    public function getChatReceiver($chat)
    {
        if (!auth()->user()->is_client_chat_member) {
            return $chat->client;
        }

        return $chat->employee;
    }
}

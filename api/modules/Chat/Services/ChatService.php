<?php


namespace Modules\Chat\Services;


class ChatService
{
    public function formatChat($chat)
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

    public function formatChatRoom($chat)
    {
        $receiver = $this->getChatReceiver($chat);

        $messages = $chat->messages->map(function($message) {
            $message->attachments = $message->media->map(function($media) {
                return [
                    'id' => $media->id,
                    'url' => $media->getFullUrl(),
                ];
            });

            return $message;
        });

        return [
            'messages' => $messages->toArray(),
            'receiver' => [
                'id' => $receiver->id,
                'name' => $receiver->name,
            ],
            'id' => $chat->id,
        ];
    }

    public function getChatReceiver($chat)
    {
        if (auth()->user()->is_employee) {
            return $chat->client;
        }

        return $chat->employee;
    }
}
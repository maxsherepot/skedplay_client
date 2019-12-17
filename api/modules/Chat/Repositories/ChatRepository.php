<?php


namespace Modules\Chat\Repositories;


use Illuminate\Database\Eloquent\Builder;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Entities\ChatMember;

class ChatRepository
{
    public function getChatByReceiverId($receiver_id, $user_id)
    {
        return $this->getChatQueryWithReceiverId($receiver_id, $user_id)
            ->with(['creator', 'receiver', 'messages' => function($query) {
            $query->limit(Chat::MESSAGES_LIMIT);
        }])->first();
    }

    /**
     * @param $receiver_id
     * @param $user_id
     * @return Builder;
     */
    public function getChatQueryWithReceiverId($receiver_id, $user_id)
    {
        return Chat::whereRaw(
            '(receiver_id = ? AND creator_id = ?) OR (receiver_id = ? AND user_id = ?)',
            [$receiver_id, $user_id, $user_id, $receiver_id]);
    }

    public function getChatQueryByChatMember(ChatMember $chatMember, int $receiverId): Builder
    {
        if ($chatMember->isClient()) {
            return Chat::query()->whereClientId($chatMember->id)->whereEmployeeId($receiverId);
        }

        return Chat::query()->whereClientId($receiverId)->whereEmployeeId($chatMember->id);
    }

    public function getChatsQuery(ChatMember $chatMember): Builder
    {
        return Chat::query()
            ->select(['chats.*', 'messages.created_at as last_message_date'])
            ->when($chatMember->isClient(), function($query) use ($chatMember) {
                $query->whereClientId($chatMember->id);
            })
            ->when($chatMember->isEmployee(), function($query) use ($chatMember) {
                $query->whereEmployeeId($chatMember->id);
            })
            ->leftJoin('messages', 'messages.chat_id', '=', 'chats.id')
            ->orderBy('updated_at', 'desc');
    }
}
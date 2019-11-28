<?php


namespace Modules\Chat\Repositories;


use Illuminate\Database\Eloquent\Builder;
use Modules\Chat\Entities\Chat;

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
}
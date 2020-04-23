<?php


namespace Modules\Chat\Repositories;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Entities\ChatMember;
use Modules\Users\Entities\User;

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

    public function getChatQueryByChatMember(User $user, int $receiverId): Builder
    {
        if ($user->is_client_chat_member) {
            return Chat::query()->whereClientId($user->id)->whereEmployeeId($receiverId);
        }

        return Chat::query()->whereClientId($receiverId)->whereEmployeeId($user->id);
    }

    public function getOrCreateChat(int $employeeId, int $clientId): Chat
    {
        return Chat::query()
            ->whereClientId($clientId)
            ->whereEmployeeId($employeeId)
            ->firstOrCreate([
                'client_id' => $clientId,
                'employee_id' => $employeeId,
            ]);
    }

    public function getChatsQuery(User $user, ?int $employeeId = null): Builder
    {
        $query = Chat::query()
            ->select(['chats.*', 'messages.updated_at as last_message_date'])
            ->leftJoin('messages', 'messages.chat_id', '=', 'chats.id')
            ->orderBy('updated_at', 'desc');

        if ($user->is_club_owner) {
            if (!$employeeId) {
                return $query->whereEmployeeId(0);
//                throw new \Exception('club owner must specify employee id');
            }

            return $query->whereEmployeeId($employeeId);
        }

        $chatMemberId = $user->is_client_chat_member
            ? $user->id
            : $user->employee->id;

        return $query
            ->when($user->is_client_chat_member, function($query) use ($chatMemberId) {
                $query->whereClientId($chatMemberId);
            })
            ->when($user->is_employee, function($query) use ($chatMemberId) {
                $query->whereEmployeeId($chatMemberId);
            });
    }

    public function getUserChatsWithLastMessages(User $user): Collection
    {
        $query = Chat::query()
            ->with(['lastMessage.attachments', 'client', 'employee'])
            ->orderBy('updated_at', 'desc');

        if ($user->is_club_owner) {
            return $query
//                ->with(['lastMessage' => function(Builder $builder) {
//                    $builder->whereFromClient(1);
//                }])
                ->whereIn(
                'employee_id',
                    $user->employees_club_owners->pluck('id')
                )
                ->get();
        }

        if ($user->is_employee) {
            return $query
                ->where('employee_id', $user->employee->id)
                ->get();
        }

        return $query
            ->where('client_id', $user->id)
            ->get();
    }
}

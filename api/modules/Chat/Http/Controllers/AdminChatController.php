<?php

namespace Modules\Chat\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Chat\Entities\AdminChat;
use Modules\Users\Entities\User;
use Nwidart\Modules\Routing\Controller;

class AdminChatController extends Controller
{
    use Statusable;

    public function __construct()
    {

    }

    public function index()
    {
        /** @var User $user */
        $user = auth()->user();

        $chats = AdminChat::with('messages', 'user')
            ->select(['admin_chats.*', 'admin_chat_messages.updated_at as last_message_date'])
            ->leftJoin('admin_chat_messages', 'admin_chat_messages.chat_id', '=', 'admin_chats.id')
            ->withCount([
                'messages' => function($query) use ($user) {
                    $query->whereSeen(0)->whereFromAdmin($user->is_admin ? 0 : 1);
                }
            ])
            ->when(!$user->is_admin, function(Builder $builder) use ($user) {
                $builder->where('user_id', $user->id);
            })
            ->orderBy('updated_at', 'desc')
            ->get()
            ->unique('id')
            ->values()
            ->map(function($chat) use ($user) {
                return [
                    'id' => $chat->id,
                    'user_id' => $chat->user_id,
                    'user' => $chat->user,
                    'unread_messages_count' => $chat->messages_count,
                    'last_message_date' => $chat->last_message_date,
                    'receiver' => $this->getReceiver($user, $chat->user)
                ];
            });

        return $chats;
    }

    public function show($chat_id)
    {
        $chat = AdminChat::with(['user', 'messages' => function($query) {
            return $query->with('attachments')->limit(AdminChat::MESSAGES_LIMIT);
        }])->findOrFail($chat_id);

        /** @var User $user */
        $user = auth()->user();

        $chat->messages()
            ->whereFromAdmin($user->is_admin ? 0 : 1)
            ->update(['seen' => 1]);

        return [
            'id' => $chat->id,
            'user_id' => $chat->user_id,
            'messages' => $chat->messages,
            'receiver' => $this->getReceiver($user, $chat->user),
        ];
    }

    public function myChatsWithLastMessages()
    {
        /** @var User $user */
        $user = auth()->user();

        return AdminChat::query()
            ->with(['lastMessage.attachments', 'user'])
            ->when(!$user->is_admin, function(Builder $builder) use ($user) {
                $builder->where('user_id', $user->id);
            })
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function(AdminChat $chat) {
                $chat->last_message = $chat->lastMessage;

                return $chat;
            });
    }

    private function getReceiver(User $user, User $chatUser): array
    {
        return !$user->isAdmin() ?
            [
                'id' => 0,
                'name' => 'Administrator',
            ]
            :
            [
                'id' => $chatUser->id,
                'name' => $chatUser->name,
            ];
    }
}

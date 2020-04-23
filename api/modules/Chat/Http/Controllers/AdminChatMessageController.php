<?php

namespace Modules\Chat\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Chat\Entities\AdminChat;
use Modules\Chat\Entities\AdminChatMessage;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Entities\Message;
use Modules\Chat\Http\Requests\SendAdminMessageRequest;
use Modules\Users\Entities\User;

class AdminChatMessageController extends Controller
{
    use Statusable;

    /**
     * @var \phpcent\Client
     */
    private $centrifugeClient;

    public function __construct(\phpcent\Client $centrifugeClient)
    {
        $this->centrifugeClient = $centrifugeClient;
    }

    public function store(SendAdminMessageRequest $request)
    {
        /** @var User $user */
        $user = auth()->user();

        $chat = AdminChat::query()
            ->when(!$user->is_admin, function(Builder $builder) use ($user) {
                $builder->where('user_id', $user->id);
            })
            ->first();

        DB::beginTransaction();

        /** @var Message $message */
        $message = AdminChatMessage::create([
            'text' => $request->input('text'),
            'chat_id' => $chat->id,
            'from_admin' => $user->is_admin ? 1 : 0,
        ]);

        foreach ($request->allFiles() as $attachment) {
            $message->addMedia($attachment)->toMediaCollection(AdminChatMessage::ATTACHMENTS_COLLECTION);
        }

        $chat->last_message_id = $message->id;
        $chat->updated_at = now();
        $chat->save();

        DB::commit();

        $chatsTypeChannelAdmin = 'admin_chats';
        $chatsTypeChannelUser = 'user_admin_chats:' . $chat->user_id;

       try {
           $this->centrifugeClient->publish($chatsTypeChannelAdmin, [
               'action' => 'refresh',
           ]);
           $this->centrifugeClient->publish($chatsTypeChannelUser, [
               'action' => 'refresh',
           ]);

           $chatChannel = 'admin_chat:' . $chat->id;

           $this->centrifugeClient->publish($chatChannel, [
//            'action' => 'add',
               'action' => 'refresh',
//            'message' => $message,
           ]);
       } catch (\Exception $e) {
           Log::error($e);
       }

        return $message->toArray();
    }
}

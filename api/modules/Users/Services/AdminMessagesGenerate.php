<?php declare(strict_types=1);

namespace Modules\Users\Services;

use Illuminate\Support\Facades\DB;
use Modules\Chat\Entities\AdminChat;
use Modules\Chat\Entities\AdminChatMessage;
use Modules\Chat\Entities\Message;
use Modules\Chat\Repositories\ChatRepository;
use Modules\Users\Entities\User;

final class AdminMessagesGenerate
{
    /**
     * @var ChatRepository
     */
    private $repository;

    public function __construct(ChatRepository $repository)
    {
        $this->repository = $repository;
    }

    public function execute(): void
    {
        $startMessage = 'admin.start_message';

        $users = User::all();

        foreach ($users as $user) {
            if ($user->isAdmin()) {
                continue;
            }

            DB::beginTransaction();

            $chat = AdminChat::firstOrCreate([
                'user_id' => $user->id,
            ]);

            if ($chat->messages()->where('text', $startMessage)->first()) {
                DB::rollBack();
                continue;
            }

            /** @var Message $message */
            $message = AdminChatMessage::create([
                'text' => $startMessage,
                'chat_id' => $chat->id,
                'from_admin' => 1,
            ]);

            $chat->last_message_id = $message->id;
            $chat->updated_at = now();
            $chat->save();

            DB::commit();
        }
    }
}

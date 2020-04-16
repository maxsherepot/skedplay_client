<?php declare(strict_types=1);

namespace Modules\Users\Services;

use Illuminate\Support\Facades\DB;
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

        $admin = User::where('email', 'admin@site.com')->first();

        $employeeUsers = User::whereRoleIs('employee')->get();

        foreach ($employeeUsers as $user) {
            DB::beginTransaction();

            $chat = $this->repository->getOrCreateChat(
                $user->employee->id,
                $admin->id
            );

            if ($chat->messages()->where('text', $startMessage)->first()) {
                DB::rollBack();
                continue;
            }

            /** @var Message $message */
            $message = Message::create([
                'text' => $startMessage,
                'chat_id' => $chat->id,
                'from_client' => 1,
            ]);

            $chat->last_message_id = $message->id;
            $chat->updated_at = now();
            $chat->save();

            DB::commit();
        }
    }
}

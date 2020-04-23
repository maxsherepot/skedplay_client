<?php

namespace Modules\Chat\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Entities\Message;
use Modules\Chat\Http\Requests\SendMessageRequest;
use Modules\Chat\Repositories\ChatRepository;
use Modules\Chat\Services\ChatService;
use Modules\Users\Entities\User;

class MessageController extends Controller
{
    use Statusable;

    private $repository;
    /**
     * @var \phpcent\Client
     */
    private $centrifugeClient;
    /**
     * @var ChatService
     */
    private $chatService;

    public function __construct(ChatRepository $repository, ChatService $chatService, \phpcent\Client $centrifugeClient)
    {
        $this->repository = $repository;
        $this->centrifugeClient = $centrifugeClient;
        $this->chatService = $chatService;
    }

    /**
     * Store a newly created resource in storage.
     * @param SendMessageRequest $request
     * @return array
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function store(SendMessageRequest $request)
    {
        /** @var User $user */
        $user = auth()->user();

        $clientId = $request->get('client_id');
        $employeeId = $request->get('employee_id');

        $chat = $this->repository->getOrCreateChat(
            intval($employeeId),
            intval($clientId)
        );

        DB::beginTransaction();

        /** @var Message $message */
        $message = Message::create([
            'text' => $request->input('text'),
            'chat_id' => $chat->id,
            'from_client' => $user->is_client ? 1 : 0,
        ]);

        foreach ($request->allFiles() as $attachment) {
            $message->addMedia($attachment)->toMediaCollection(Message::ATTACHMENTS_COLLECTION);
        }

        $chat->last_message_id = $message->id;
        $chat->updated_at = now();
        $chat->save();

        DB::commit();

        $chatsTypeChannelClient = 'client_chats:' . $clientId;
        $chatsTypeChannelEmployee = 'employee_chats:' . $employeeId;

        try {
            $this->centrifugeClient->publish($chatsTypeChannelClient, [
                'action' => 'refresh',
            ]);
            $this->centrifugeClient->publish($chatsTypeChannelEmployee, [
                'action' => 'refresh',
            ]);

            $chatChannel = 'chat:' . $chat->id;

//        $message->__typename = 'Message';

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

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     */
    public function destroy($id)
    {
        Message::findOrFail($id)->delete();
        return $this->success();
    }
}

<?php

namespace Modules\Chat\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Entities\Message;
use Modules\Chat\Http\Requests\SendMessageRequest;
use Modules\Chat\Repositories\ChatRepository;
use Modules\Users\Entities\User;

class MessageController extends Controller
{
    use Statusable;

    private $repository;
    /**
     * @var \phpcent\Client
     */
    private $centrifugeClient;

    public function __construct(ChatRepository $repository, \phpcent\Client $centrifugeClient)
    {
        $this->repository = $repository;
        $this->centrifugeClient = $centrifugeClient;
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(SendMessageRequest $request)
    {
        /** @var User $user */
        $user = auth()->user();

        if (!$request->input('chat_id')) {
            if (!$chat = $this->repository->getChatQueryByChatMember($user, (int) $request->input('employee_id'))->first()) {
                $chat = Chat::create([
                    'employee_id' => $request->get('employee_id'),
                    'client_id' => $user->id,
                ]);
            }
        } else {
            $chat = $this->repository->getChatsQuery($user)->where('chats.id', $request->input('chat_id'))->first();
        }

        DB::beginTransaction();

        $message = Message::create([
            'text' => $request->input('text'),
            'chat_id' => $chat->id,
            'from_client' => $user->isClient() ? 1 : 0,
        ]);

        $chat->last_message_id = $message->id;
        $chat->updated_at = now();
        $message->save();

        DB::commit();

        $chatChannel = 'chat:' . $chat->id;

        $presence = $this->centrifugeClient->presence($chatChannel);

        if (count($presence['result']['presence'] ?? []) < 2) {
            $chatsType = !$user->isClient()
                ? 'client_chats:' . $user->id
                : 'employee_chats:' . (optional($user->employee)->id ?? $request->get('employee_id'));


            $this->centrifugeClient->publish($chatsType, [
                'action' => 'refresh',
            ]);
        }

        $this->centrifugeClient->publish($chatChannel, [
            'action' => 'refresh',
            'message' => $message,
        ]);

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

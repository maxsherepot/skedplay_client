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

    public function __construct(ChatRepository $repository)
    {
        $this->repository = $repository;
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
            $user_id = auth()->id();
            if (!$chat = $this->repository->getChatQueryByChatMember($user, (int) $request->input('receiver_id'))->first()) {
                $chat = Chat::create([
                    'creator_id' => $user_id,
                    'receiver_id' => $request->input('receiver_id')
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

<?php

namespace Modules\Chat\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Entities\Message;
use Modules\Chat\Repositories\ChatRepository;

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
    public function store(GraphQLFormRequest $request)
    {
        $request->validated([
            'chat_id' => 'nullable|required|integer',
            'receiver_id' => 'required|integer',
            'text' => 'required|string'
        ]);

        if (!$request->input('chat_id')) {
            $user_id = auth()->id();
            if (!$chat = $this->repository->getChatQueryWithReceiverId($request->input('receiver_id'), $user_id)->first()) {
                $chat = Chat::create([
                    'creator_id' => auth()->id(),
                    'receiver_id' => $request->input('receiver_id')
                ]);
            }
        } else {
            $chat = auth()->user()->chats()->where('id', $request->input('chat_id'))->first();
        }

        $message = Message::create([
            'text' => $request->input('text'),
            'chat_id' => $chat->id,
            'creator_id' => auth()->id()
        ]);

        $chat->last_message_id = $message->id;
        $message->save();

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

<?php

namespace Modules\Admin\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Admin\Http\Requests\RejectUserRequest;
use Modules\Users\Entities\User;
use phpcent\Client;

class UserController extends Controller
{
    /**
     * @var Client
     */
    private $centrifugeClient;

    /**
     * UserController constructor.
     * @param Client $centrifugeClient
     */
    public function __construct(Client $centrifugeClient)
    {
        $this->centrifugeClient = $centrifugeClient;
    }

    public function show($id)
    {
        $user = User::findOrFail($id)->append(['type']);

        return \response()->json($user);
    }

    public function confirm($id)
    {
        $user = User::findOrFail($id);

        $user->status = User::STATUS_CONFIRMED;
        $user->rejected_reason = null;
        $user->save();
    }

    public function reject(RejectUserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $user->status = User::STATUS_REFUSED;
        $user->rejected_reason = $request->get('reason');
        $user->save();
        $chanel = 'user_status:'. $user->id;

        $this->centrifugeClient->publish($chanel, [
            'status' => 'rejected',
        ]);
    }
}

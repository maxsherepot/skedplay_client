<?php

namespace Modules\Admin\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Admin\Http\Requests\RejectUserRequest;
use Modules\Users\Entities\User;

class UserController extends Controller
{
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
    }
}

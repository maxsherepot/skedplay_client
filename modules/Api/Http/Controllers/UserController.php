<?php

namespace Modules\Api\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\User\UserUpdateRequest;
use Modules\Users\Entities\User;
use Modules\Users\Repositories\UserRepository;

class UserController extends Controller
{

    use Statusable;

    protected $users;


    public function __construct(UserRepository $repository)
    {
        $this->users = $repository;
    }

    public function show(User $user)
    {
        dd($user);
    }

    /**
     * @param User $user
     * @param UserUpdateRequest $request
     * @return array
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        /**
         * TODO USER POLICY
         */

        $user = $this->users->update($user, collect($request->all()));

        return $this->success();
    }
}

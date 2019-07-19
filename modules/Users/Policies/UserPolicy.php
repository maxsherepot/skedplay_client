<?php

namespace Modules\Users\Policies;

use Modules\Users\Entities\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

//    public function update(User $authUser, User $user)
//    {
//        return $authUser->id == $user->id;
//    }
}
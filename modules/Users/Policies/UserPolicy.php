<?php

namespace Modules\Users\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Users\Entities\User;

class UserPolicy
{
    use HandlesAuthorization;

    public function update(User $authUser, User $user)
    {
        return $authUser->owns($user, 'id') || $authUser->hasPermission('update-users');
    }
}
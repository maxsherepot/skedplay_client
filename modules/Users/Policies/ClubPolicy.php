<?php

namespace Modules\Users\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Users\Entities\Club;
use Modules\Users\Entities\User;

class ClubPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return $user->hasPermission('create-clubs');
    }

    public function update(User $user, Club $club)
    {
        return $user->owns($club, 'id') || $user->hasPermission('update-clubs');
    }
}
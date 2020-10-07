<?php

namespace Modules\Common\Policies;

use Modules\Users\Entities\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SubscribeClubPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function view(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function update(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN);
    }
}

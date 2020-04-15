<?php

namespace Modules\Common\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Common\Entities\Service;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class ServicePolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function view(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN) && $user->hasPermission(Permission::READ_SERVICES);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_EMPLOYEE)) && $user->hasPermission(Permission::CREATE_SERVICES);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function update(User $user): bool
    {
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_EMPLOYEE) || $user->hasRole(User::ACCOUNT_CLUB_OWNER)) && $user->hasPermission(Permission::UPDATE_SERVICES);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN) && $user->hasPermission(Permission::DELETE_SERVICES);
    }
}

<?php declare(strict_types=1);

namespace Modules\Users\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN) && $user->hasPermission(Permission::CREATE_USERS);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function update(User $user): bool
    {
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_MODERATOR))
            && $user->hasPermission(Permission::UPDATE_USERS);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function view(User $user): bool
    {
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_MODERATOR))
            && $user->hasPermission(Permission::READ_USERS);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN) && $user->hasPermission(Permission::DELETE_USERS);
    }
}

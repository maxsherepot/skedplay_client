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
        if (!$user->hasRole(User::ACCOUNT_ADMIN)) {
            return false;
        }
        return $user->hasPermission(Permission::CREATE_USERS);
    }

    /**
     * @param User $authUser
     * @param User $user
     * @return bool
     */
    public function update(User $authUser, User $user): bool
    {
        if ($user->hasRole('club_owner') ||
            $user->hasRole('employee') ||
            $user->hasRole('client') ||
            $user->hasRole('admin') ||
            $user->hasRole('moderator')) {
            return false;
        }
        return $authUser->owns($user, 'id') || $authUser->hasPermission(Permission::UPDATE_USERS);
    }

    public function view(User $authUser, User $user): bool
    {
        return $authUser->owns($user, 'id') || $authUser->hasPermission(Permission::UPDATE_USERS);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return $user->hasPermission(Permission::DELETE_USERS);
    }
}

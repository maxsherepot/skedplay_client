<?php declare(strict_types=1);

namespace Modules\Clubs\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Clubs\Entities\Club;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\PermissionPlan;
use Modules\Users\Entities\User;

class ClubPolicy
{
    use HandlesAuthorization;

    public function view(User $user): bool
    {
        return true;
    }

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_CLUB_OWNER))
            && $user->hasPermission(Permission::CREATE_CLUBS)
            && $user->hasPermissionPlan(PermissionPlan::MAX_CLUB);
    }

    /**
     * @param User $user
     * @param Club $club
     * @return bool
     */
    public function update(User $user, Club $club): bool
    {
        if ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_MODERATOR)
            || $user->hasRole(User::ACCOUNT_MANAGER) || $user->hasRole(User::ACCOUNT_CLUB_OWNER)) {
            return true;
        }

        return $user->owns($club, 'id') || $user->hasPermission(Permission::UPDATE_CLUBS);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_CLUB_OWNER);
    }
}

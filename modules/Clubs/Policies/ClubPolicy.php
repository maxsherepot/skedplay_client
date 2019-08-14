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

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionPlan(PermissionPlan::MAX_CLUB) && $user->hasPermission(Permission::CREATE_CLUBS);
    }

    /**
     * @param User $user
     * @param Club $club
     * @return bool
     */
    public function update(User $user, Club $club): bool
    {
        return $user->owns($club, 'id') || $user->hasPermission(Permission::UPDATE_CLUBS);
    }
}

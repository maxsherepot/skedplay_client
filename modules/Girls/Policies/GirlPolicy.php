<?php declare(strict_types=1);

namespace Modules\Girls\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Girls\Entities\Girl;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class GirlPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @param Girl $girl
     * @return bool
     */
    public function update(User $user, Girl $girl): bool
    {
        return $user->girls_club_owners->contains($girl->id)
            || $user->owns($girl, 'owner_id')
            && $user->hasPermission(Permission::UPDATE_GIRLS);
    }
}
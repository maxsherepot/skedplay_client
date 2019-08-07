<?php declare(strict_types=1);

namespace Modules\Clubs\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Clubs\Entities\Club;
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
        return $user->hasPermission('create-clubs');
    }

    /**
     * @param User $user
     * @param Club $club
     * @return bool
     */
    public function update(User $user, Club $club): bool
    {
        return $user->owns($club, 'id') || $user->hasPermission('update-clubs');
    }
}

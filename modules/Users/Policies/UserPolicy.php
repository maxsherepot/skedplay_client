<?php declare(strict_types=1);

namespace Modules\Users\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Users\Entities\User;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $authUser
     * @param User $user
     * @return bool
     */
    public function update(User $authUser, User $user): bool
    {
        return $authUser->owns($user, 'id') || $authUser->hasPermission('update-users');
    }
}
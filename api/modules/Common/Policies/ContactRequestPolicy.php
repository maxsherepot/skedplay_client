<?php


namespace Modules\Common\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class ContactRequestPolicy
{
    use HandlesAuthorization;

    public function create(User $user): bool
    {
        if ($user->hasRole('admin') || $user->hasRole(User::ACCOUNT_MANAGER)) {
            return false;
        }

        return $user->hasPermission(Permission::CREATE_SERVICES);
    }
}

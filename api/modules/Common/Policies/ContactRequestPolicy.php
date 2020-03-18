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
        if ($user->hasRole('admin')) {
            return false;
        }

        return $user->hasPermission(Permission::CREATE_SERVICES);
    }
}

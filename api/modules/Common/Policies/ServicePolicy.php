<?php

namespace Modules\Common\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class ServicePolicy
{
    use HandlesAuthorization;

    public function create(User $user): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission(Permission::CREATE_SERVICES);
    }

    public function update(User $user): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission(Permission::UPDATE_SERVICES);
    }

    public function view(User $user): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission(Permission::READ_SERVICES);
    }
}

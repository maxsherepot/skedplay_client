<?php

namespace Modules\Common\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class PriceTypePolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->hasPermission(Permission::CREATE_PRICES);
    }
}

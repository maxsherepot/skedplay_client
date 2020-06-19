<?php

namespace Modules\Common\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Users\Entities\User;

class ReadOnlyPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
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
        return false;
    }

    /**
     * @param User $user
     * @return bool
     */
    public function update(User $user): bool
    {
        return false;
    }

    /**
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return false;
    }
}

<?php

namespace Modules\Main\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Main\Entities\Language;
use Modules\Users\Entities\User;

class LanguagePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function create()
    {
        return true;
    }

    public function delete(User $user, Language $language)
    {
        return $language->id !== 1;
    }

    public function viewAny(User $user)
    {
        return true;
    }

    public function view(User $user)
    {
        return true;
    }

    public function update(User $user)
    {
        return true;
    }
}

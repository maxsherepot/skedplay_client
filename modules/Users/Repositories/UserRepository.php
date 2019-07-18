<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Illuminate\Support\Collection;
use Modules\Users\Entities\User;

class UserRepository
{
    /**
     * @param Collection $collection
     * @return User
     */
    public function store(Collection $collection): User
    {
        return User::create($collection->toArray());
    }

    /**
     * @param User $user
     * @return string
     */
    public function createToken(User $user): string
    {
        return $user->createToken('Laravel Password Grant Client')->accessToken;
    }
}
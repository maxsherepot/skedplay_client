<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Modules\Users\Entities\User;

class UserRepository
{
    /**
     * @param $user
     * @return array
     */
    public function register(User $user): array
    {
        $token = $user->createToken('Laravel Password Grant Client')->accessToken;

        $response = [
            'access_token' => $token,
            'user'         => $user
        ];

        return $response;
    }

    /**
     * @param array $data
     * @return User
     */
    public function store(array $data): User
    {
        return User::create($data);
    }
}
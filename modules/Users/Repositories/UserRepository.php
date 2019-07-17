<?php

namespace Modules\Users\Repositories;

use Modules\Users\Entities\User;

class UserRepository
{
    /**
     * @param array $args
     * @return array
     */
    public function register(array $args)
    {
        /** @var User $user */
        $user = User::create($args);
        $token = $user->createToken('Laravel Password Grant Client')->accessToken;

        /**
         * Todo:
         * add role
         * add permission?
         * register event
         */

        $response = [
            'access_token' => $token,
            'user'         => $user
        ];

        return $response;
    }
}
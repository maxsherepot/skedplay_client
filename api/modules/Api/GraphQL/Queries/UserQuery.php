<?php

namespace Modules\Api\GraphQL\Queries;

use Modules\Users\Entities\User;

class UserQuery
{
    public function getFavoriteEmployees($rootValue, array $args)
    {
        /** @var User $user */
        $user = (new User())->find($args['id']);
        return $user->favoriteEmployees()->get();
    }

    public function getFavoriteClubs($rootValue, array $args)
    {
        /** @var User $user */
        $user = (new User())->find($args['id']);
        return $user->favoriteClubs()->get();
    }

    public function getFavoriteEvents($rootValue, array $args)
    {
        /** @var User $user */
        $user = (new User())->find($args['id']);
        return $user->favoriteEvents()->get();
    }
}
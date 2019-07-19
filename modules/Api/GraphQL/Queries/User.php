<?php

namespace Modules\Api\GraphQL\Queries;

use Modules\Users\Repositories\UserRepository;

class User
{
    /**
     * @var UserRepository
     */
    private $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }
}
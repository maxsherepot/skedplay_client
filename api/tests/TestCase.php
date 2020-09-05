<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Modules\Users\Entities\User;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use MakesGraphQLRequests;

    /**
     * @param string $email
     *
     * @return mixed
     */
    public function getUser($email = 'employee@site.com')
    {
        return User::where('email', $email)->first();
    }
}

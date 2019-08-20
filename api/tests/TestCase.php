<?php

namespace Tests;

use Modules\Users\Entities\User;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use MakesGraphQLRequests;

    /**
     * @param string $email
     * @return mixed
     */
    public function getUser($email = 'employee@site.com')
    {
        return User::where('email', $email)->first();
    }
}

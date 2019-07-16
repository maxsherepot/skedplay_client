<?php

namespace Modules\Main\Factory\Activation;

use Modules\Main\Contracts\Activation\ActivationContract;

class EmailProvider implements ActivationContract
{
    /**
     * @return string
     */
    public static function push()
    {
        //TODO Need implement create token via redis

        return 'This push method';
    }

    /**
     * @return string
     */
    public static function confirm()
    {
        //TODO Need implement check token via redis

        return 'This confirm method';
    }
}
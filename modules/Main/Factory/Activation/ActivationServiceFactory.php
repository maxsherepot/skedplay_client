<?php

namespace Modules\Main\Factory\Activation;

class ActivationServiceFactory
{
    public static function driver($driver)
    {
        return app(__NAMESPACE__ . '\\' . ucfirst($driver) . 'Provider');
    }
}
<?php

namespace Modules\Main\Contracts\Activation;

interface ActivationContract
{
    public static function push();

    public static function confirm();
}
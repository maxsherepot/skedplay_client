<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class LanguageServiceFacade extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'language.service';
    }


    public static function getPrefix()
    {
        $segment = request()->segment(1);
        if (isset($segment) && isset(self::getPrefixes()[$segment])) {
            return $segment;
        }

        return null;
    }

    public static function getPrefixes()
    {
        return config('languages');
    }
}
<?php

namespace Modules\Common;

use Illuminate\Support\Facades\App;

class Helpers
{
    public static function frontLocalePath() : string
    {
        $locale = App::getLocale();
        return $locale === 'de' ? '' : ('/' . $locale);
    }
}

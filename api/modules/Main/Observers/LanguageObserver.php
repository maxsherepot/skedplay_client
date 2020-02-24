<?php

namespace Modules\Main\Observers;

use Illuminate\Support\Facades\Artisan;

class LanguageObserver
{
    public function created()
    {
        Artisan::call('translates:check');
    }

    public function deleted()
    {
        Artisan::call('translates:check');
    }
}

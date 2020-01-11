<?php

namespace Modules\Main\Observers;


use Illuminate\Support\Facades\Artisan;

class UiTranslateObserver
{
    public function saved()
    {
        Artisan::call('translates:refresh');
    }
}
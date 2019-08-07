<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;
use Laravel\Telescope\TelescopeServiceProvider;
use Modules\Clubs\Entities\Club;
use Modules\Girls\Entities\Girl;
use Modules\Main\Entities\Faq;
use Modules\Main\Entities\FaqCategory;
use Modules\Main\Entities\FaqItem;
use Modules\Main\Entities\Page;
use Modules\Users\Entities\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->isLocal()) {
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     * @throws \Exception
     */
    public function boot()
    {
        Relation::morphMap([
            'girl'                  => Girl::class,
            'user'                  => User::class,
            'club'                  => Club::class,
            Page::MORPH_TYPE        => 'Modules\Main\Entities\Page',
            Faq::MORPH_TYPE         => 'Modules\Main\Entities\Faq',
            FaqItem::MORPH_TYPE     => 'Modules\Main\Entities\FaqItem',
        ]);
    }
}

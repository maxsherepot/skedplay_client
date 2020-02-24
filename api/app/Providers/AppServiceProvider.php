<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Nova;
use Laravel\Telescope\TelescopeServiceProvider;
use Modules\Chat\Entities\Message;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;
use Modules\Main\Entities\Faq;
use Modules\Main\Entities\FaqItem;
use Modules\Main\Entities\Language;
use Modules\Main\Entities\Page;
use Modules\Main\Entities\UiTranslate;
use Modules\Main\Observers\LanguageObserver;
use Modules\Main\Observers\UiTranslateObserver;
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
            'message'          => Message::class,
            'employee'          => Employee::class,
            'user'              => User::class,
            'club'              => Club::class,
            'event'             => Event::class,
            Page::MORPH_TYPE    => 'Modules\Main\Entities\Page',
            Faq::MORPH_TYPE     => 'Modules\Main\Entities\Faq',
            FaqItem::MORPH_TYPE => 'Modules\Main\Entities\FaqItem',
        ]);

        Nova::serving(function () {
            UiTranslate::observe(UiTranslateObserver::class);
            Language::observe(LanguageObserver::class);
        });
    }
}

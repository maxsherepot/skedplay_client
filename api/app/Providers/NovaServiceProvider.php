<?php

namespace App\Providers;

use App\Nova\Club;
use App\Nova\ClubType;
use App\Nova\ContactPhone;
use App\Nova\Employee;
use App\Nova\Event;
use App\Nova\EventType;
use App\Nova\Language;
use App\Nova\Photo;
use App\Nova\Race;
use App\Nova\Service;
use App\Nova\UiTranslate;
use App\Nova\User;
use App\Nova\Video;
use Laravel\Nova\Nova;
use Laravel\Nova\Cards\Help;
use Illuminate\Support\Facades\Gate;
use Laravel\Nova\NovaApplicationServiceProvider;

class NovaServiceProvider extends NovaApplicationServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }

    /**
     * Register the Nova routes.
     *
     * @return void
     */
    protected function routes()
    {
        Nova::routes()
                ->withAuthenticationRoutes()
                ->withPasswordResetRoutes()
                ->register();
    }

    /**
     * Register the Nova gate.
     *
     * This gate determines who can access Nova in non-local environments.
     *
     * @return void
     */
    protected function gate()
    {
        Gate::define('viewNova', function ($user) {
            return $user->hasRole('admin');
        });
    }

    /**
     * Get the cards that should be displayed on the Nova dashboard.
     *
     * @return array
     */
    protected function cards()
    {
        return [
            new Help,
        ];
    }

    /**
     * Get the tools that should be listed in the Nova sidebar.
     *
     * @return array
     */
    public function tools()
    {
        return [];
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    public function resources()
    {
        Nova::resources([
            User::class,
            Employee::class,

            Club::class,
            ClubType::class,
            Event::class,
            EventType::class,

            Photo::class,
            Video::class,

            Service::class,
            Race::class,

            ContactPhone::class,

            UiTranslate::class,
            Language::class,
        ]);
    }
}

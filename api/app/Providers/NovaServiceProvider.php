<?php

namespace App\Providers;

use App\Nova\Club;
use App\Nova\ClubType;
use App\Nova\ContactPhone;
use App\Nova\ContactRequest;
use App\Nova\Employee;
use App\Nova\Event;
use App\Nova\EventType;
use App\Nova\GroupService;
use App\Nova\HelpCenterCategory;
use App\Nova\HelpCenterTopic;
use App\Nova\Language;
use App\Nova\Parameter;
use App\Nova\ParameterOption;
use App\Nova\Photo;
use App\Nova\Race;
use App\Nova\Role;
use App\Nova\RoleUser;
use App\Nova\Service;
use App\Nova\UiTranslate;
use App\Nova\User;
use App\Nova\Verification;
use App\Nova\Video;
use Illuminate\Validation\Rule;
use Laravel\Nova\Fields\Field;
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

        Field::macro('fallbackLocaleRules', function ($rules) {
            $this->fallbackLocaleRules = ($rules instanceof Rule || is_string($rules)) ? func_get_args() : $rules;

            return $this;
        });

        Field::macro('creationFallbackLocaleRules', function ($rules) {
            $this->creationFallbackLocaleRules = ($rules instanceof Rule || is_string($rules)) ? func_get_args() : $rules;

            return $this;
        });

        Field::macro('updateFallbackLocaleRules', function ($rules) {
            $this->updateFallbackLocaleRules = ($rules instanceof Rule || is_string($rules)) ? func_get_args() : $rules;

            return $this;
        });
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
            Role::class,
            //RoleUser::class,
            Verification::class,

            Club::class,
            ClubType::class,
            Event::class,
            EventType::class,

            Parameter::class,
            ParameterOption::class,

            Photo::class,
            Video::class,

            Service::class,
            GroupService::class,
            Race::class,

            ContactPhone::class,
            ContactRequest::class,

            HelpCenterCategory::class,
            HelpCenterTopic::class,

            UiTranslate::class,
            Language::class,
        ]);
    }
}

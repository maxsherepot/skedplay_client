<?php

namespace App\Providers;

use App\Nova\Club;
use App\Nova\ClubPattern;
use App\Nova\ClubSubscriber;
use App\Nova\ClubType;
use App\Nova\ContactPhone;
use App\Nova\ContactRequest;
use App\Nova\Dashboards\EmailSubscriptions;
use App\Nova\Dashboards\UserInsights;
use App\Nova\EmailTemplate;
use App\Nova\Employee;
use App\Nova\EmployeeComplaint;
use App\Nova\EmployeeComplaintTheme;
use App\Nova\EmployeeSubscriber;
use App\Nova\Event;
use App\Nova\EventCount;
use App\Nova\EventPattern;
use App\Nova\EventType;
use App\Nova\GirlPattern;
use App\Nova\GroupService;
use App\Nova\HelpCenterCategory;
use App\Nova\HelpCenterTopic;
use App\Nova\InfoUser;
use App\Nova\Language;
use App\Nova\Page;
use App\Nova\Parameter;
use App\Nova\ParameterOption;
use App\Nova\Photo;
use App\Nova\Race;
use App\Nova\Role;
use App\Nova\Service;
use App\Nova\Setting;
use App\Nova\TransPattern;
use App\Nova\UiTranslate;
use App\Nova\User;
use App\Nova\UserCard;
use App\Nova\Verification;
use App\Nova\Video;
use App\Nova\VipPattern;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Laravel\Nova\Cards\Help;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Nova;
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

        Nova::style('nova', public_path('css/nova.css'));
        Nova::script('nova', public_path('js/nova.js'));

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
     * Get the extra dashboards that should be displayed on the Nova dashboard.
     *
     * @return array
     */
    protected function dashboards()
    {
        return [
            new UserInsights(),
            new EmailSubscriptions(),
        ];
    }

    /**
     * Get the cards that should be displayed on the Nova dashboard.
     *
     * @return array
     */
    protected function cards()
    {
        return [
            new Help(),
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
            UserCard::class,
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

            EmployeeComplaintTheme::class,
            EmployeeComplaint::class,

            Page::class,
            GirlPattern::class,
            TransPattern::class,
            VipPattern::class,
            ClubPattern::class,
            EventPattern::class,

            HelpCenterCategory::class,
            HelpCenterTopic::class,

            EventCount::class,

            UiTranslate::class,
            Language::class,

            EmailTemplate::class,
            ClubSubscriber::class,
            EmployeeSubscriber::class,

            Setting::class,

            EmailTemplate::class,
            ClubSubscriber::class,
            EmployeeSubscriber::class,

            InfoUser::class,
        ]);
    }
}

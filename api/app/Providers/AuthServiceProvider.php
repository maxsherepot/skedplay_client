<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;
use Spatie\MediaLibrary\Models\Media;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        \Modules\Users\Entities\User::class         => \Modules\Users\Policies\UserPolicy::class,
        \Modules\Clubs\Entities\Club::class         => \Modules\Clubs\Policies\ClubPolicy::class,
        \Modules\Employees\Entities\Employee::class => \Modules\Employees\Policies\EmployeePolicy::class,
        \Modules\Events\Entities\Event::class       => \Modules\Events\Policies\EventPolicy::class,
        \Modules\Common\Entities\Service::class     => \Modules\Common\Policies\ServicePolicy::class,
        \Modules\Common\Entities\PriceType::class   => \Modules\Common\Policies\PriceTypePolicy::class,
        \Modules\Main\Entities\Language::class   => \Modules\Main\Policies\LanguagePolicy::class,
        \Modules\Main\Entities\UiTranslate::class   => \Modules\Main\Policies\UiTranslatePolicy::class,
        Media::class   => \Modules\Main\Policies\MediaPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }
}

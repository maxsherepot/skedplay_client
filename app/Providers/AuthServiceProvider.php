<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        \Modules\Users\Entities\User::class => \Modules\Users\Policies\UserPolicy::class,
        \Modules\Clubs\Entities\Club::class => \Modules\Clubs\Policies\ClubPolicy::class,
        \Modules\Events\Entities\Event::class => \Modules\Events\Policies\EventPolicy::class,
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

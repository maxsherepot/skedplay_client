<?php

namespace Modules\Users\Providers;

use Illuminate\Auth\Events\Registered;
use Modules\Users\Listeners\UserRegisterListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class UsersEventServiceProvider extends ServiceProvider
{
    protected $listen = [
//        Registered::class => [
//            UserRegisterListener::class,
//        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
        //
    }
}
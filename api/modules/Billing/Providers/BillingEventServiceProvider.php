<?php

namespace Modules\Billing\Providers;

use Modules\Billing\Events\PaymentCompleteEvent;
use Modules\Billing\Events\SubscribeOnPlanEvent;
use Modules\Billing\Listeners\SubscribeOnPlanListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class BillingEventServiceProvider extends ServiceProvider
{
    protected $listen = [
        SubscribeOnPlanEvent::class => [
            SubscribeOnPlanListener::class,
        ],
        PaymentCompleteEvent::class => [
            SubscribeOnPlanListener::class,
        ],
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

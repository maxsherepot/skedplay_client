<?php

namespace Modules\Billing\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SubscribeOnPlanListener
{
    /**
     * Handle the event.
     *
     * @param object $event
     * @return void
     */
    public function handle($event)
    {
        $event->user->newSubscription('main', $event->plan_id)
            ->create();
    }
}

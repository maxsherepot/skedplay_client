<?php

namespace App\Listeners;

use App\Events\ResourceViewedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ResourceViewedListener
{
    /**
     * Handle the event.
     *
     * @param  ResourceViewedEvent  $event
     * @return void
     */
    public function handle(ResourceViewedEvent $event)
    {
        $event->getEntity()->view();
    }
}

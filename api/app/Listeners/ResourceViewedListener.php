<?php

namespace App\Listeners;

use App\Events\ResourceViewedEvent;

class ResourceViewedListener
{
    /**
     * Handle the event.
     *
     * @param ResourceViewedEvent $event
     *
     * @return void
     */
    public function handle(ResourceViewedEvent $event)
    {
        $event->getEntity()->view();
    }
}

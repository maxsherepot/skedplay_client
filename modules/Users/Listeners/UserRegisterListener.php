<?php

namespace Modules\Users\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Log;

class UserRegisterListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param Registered $event
     * @return void
     */
    public function handle(Registered $event)
    {
        Log::info('registered', (array) $event);
    }
}

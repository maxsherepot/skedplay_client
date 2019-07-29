<?php

namespace Modules\Users\Services\Sms\Drivers;

use Illuminate\Support\Facades\Log;
use Modules\Users\Services\Sms\Abstracts\Driver;

class Logger extends Driver
{
    /**
     * Driver constructor.
     *
     * @param $settings
     */
    public function __construct($settings)
    {
        //
    }

    public function send()
    {
        foreach ($this->recipients as $recipient) {
            Log::info("To $recipient, $this->body");
        };
    }
}
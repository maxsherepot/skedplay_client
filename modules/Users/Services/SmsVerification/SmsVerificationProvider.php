<?php

namespace Modules\Users\Services\SmsVerification;

use Illuminate\Support\ServiceProvider;

/**
 * Class SmsVerificationProvider
 */
class SmsVerificationProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(SmsClientInterface::class, function () {
            return new NexmoSmsClient(config('services.nexmo.key'), config('services.nexmo.secret'));
        });
    }
}
<?php

namespace Modules\Users\Services\SmsVerification;

use Modules\Users\Services\SmsVerification\Code\CodeProcessorInterface;
use Modules\Users\Services\SmsVerification\Clients\SmsClientInterface;
use Modules\Users\Services\SmsVerification\Code\StaticCodeProcessor;
use Modules\Users\Services\SmsVerification\Clients\NexmoSmsClient;
use Modules\Users\Services\SmsVerification\Clients\TestSmsClient;
use Modules\Users\Services\SmsVerification\Code\CodeProcessor;
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
//            return new NexmoSmsClient(config('services.nexmo.key'), config('services.nexmo.secret'));
            return new TestSmsClient();
        });

        $this->app->singleton(CodeProcessorInterface::class, function () {
//            return new CodeProcessor();
            return new StaticCodeProcessor();
        });
    }
}
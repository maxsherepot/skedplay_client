<?php

namespace Modules\Users\Services\CodeProcessor;

use Modules\Users\Services\CodeProcessor\Contracts\CodeProcessorInterface;
use Illuminate\Support\ServiceProvider;

/**
 * Class CodeProcessorProvider
 */
class CodeProcessorProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(CodeProcessorInterface::class, function () {
//            return new CodeProcessor();
            return new StaticCodeProcessor();
        });
    }
}
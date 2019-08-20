<?php

namespace Modules\Users\Services\CodeProcessor;

use Illuminate\Support\ServiceProvider;
use Modules\Users\Services\CodeProcessor\Contracts\CodeProcessorInterface;

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
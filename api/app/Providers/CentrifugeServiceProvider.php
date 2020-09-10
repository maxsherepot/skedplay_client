<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class CentrifugeServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\phpcent\Client::class, function ($app) {
            $config = config('broadcasting.connections.centrifuge');

            $client = new \phpcent\Client($config['url'], $config['api_key'], $config['secret']);

            $client->setUseAssoc(true);

            return $client;
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @throws \Exception
     *
     * @return void
     */
    public function boot()
    {
    }
}

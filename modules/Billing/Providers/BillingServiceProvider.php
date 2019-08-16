<?php

namespace Modules\Billing\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Invoice;
use Modules\Billing\Observers\InvoiceObserver;
use Modules\Billing\Services\Gateway\PayPal;

class BillingServiceProvider extends ServiceProvider
{
    /**
     * Boot the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

        $this->app->bind(
            PaymentGatewayInterface::class,
            PayPal::class
        );

        Invoice::observe(InvoiceObserver::class);
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(RouteServiceProvider::class);
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [];
    }
}

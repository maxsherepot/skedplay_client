<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;
use Laravel\Telescope\TelescopeServiceProvider;
use Modules\Chat\Entities\Message;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;
use Modules\Main\Entities\Faq;
use Modules\Main\Entities\FaqItem;
use Modules\Main\Entities\Page;
use Modules\Users\Entities\User;

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
     * @return void
     * @throws \Exception
     */
    public function boot()
    {

    }
}

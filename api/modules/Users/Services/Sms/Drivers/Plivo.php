<?php

namespace Modules\Users\Services\Sms\Drivers;

use Modules\Users\Services\Sms\Abstracts\Driver;
use Plivo\RestClient;

class Plivo extends Driver
{
    protected object $settings;

    protected RestClient $client;

    public function __construct($settings)
    {
        $this->settings = (object)$settings;

        $this->client = new RestClient($this->settings->key, $this->settings->secret);
    }

    public function send()
    {
        $response = collect();

        foreach ($this->recipients as $recipient) {
            $res = $this->client->messages->create(
                str_replace(['-', ' '], '', $this->settings->from),
                [str_replace(['-', ' '], '', $recipient)],
                $this->body
            );

            \Log::info('---', [$res]);
        }

        return (count($this->recipients) == 1) ? $response->first() : $response;
    }
}

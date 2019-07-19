<?php

namespace Modules\Users\Services\Sms\Drivers;

use Modules\Users\Services\Sms\Abstracts\Driver;
use Nexmo\Client\Credentials\Basic;
use Nexmo\Message\Text;
use Nexmo\Client;

class Nexmo extends Driver
{
    /**
     * Settings.
     *
     * @var object
     */
    protected $settings;

    /**
     * Client.
     *
     * @var Client
     */
    protected $client;

    /**
     * Construct the class with the relevant settings.
     *
     * SendSmsInterface constructor.
     * @param $settings object
     */
    public function __construct($settings)
    {
        $this->settings = (object)$settings;
        $this->client = new Client(
            new Basic($this->settings->key, $this->settings->secret)
        );
    }

    /**
     * Send text message and return response.
     *
     * @return object
     * @throws Client\Exception\Exception
     * @throws Client\Exception\Request
     * @throws Client\Exception\Server
     */
    public function send()
    {
        $response = collect();

        foreach ($this->recipients as $recipient) {
            $text = new Text($recipient, $this->settings->from, $this->body);
            $response->put($recipient, $this->client->message()->send($text));
        }

        return (count($this->recipients) == 1) ? $response->first() : $response;
    }
}
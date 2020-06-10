<?php

namespace Modules\Api\Components;
use Plivo\RestClient;


class SendSMSNotificationComponent
{
    public function sendMessage(string $phoneNumber): bool
    {
        $authId = env('PLIVO_AUTH_ID');
        $authToken = env('PLIVO_AUTH_TOKEN');

        $client = new RestClient($authId, $authToken);
        $message_created = $client->messages->create(
            'the_source_number',
            ['the_destination_number'],
            'Hello, world!'
        );

        return true;
    }

}

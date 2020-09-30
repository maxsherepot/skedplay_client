<?php

namespace Modules\Api\Components;

use GuzzleHttp\Client;

class NotifyAdminTelegramComponent
{
    public function sendNotification(string $text): bool
    {
        $client = new Client();

        $apiToken = config('telegram_notificator.token');

        $data = [
            'chat_id' => config('telegram_notificator.channel'),
            'text' => $text
        ];

        $client->post('https://api.telegram.org/bot'.$apiToken.'/sendMessage', [
            'json' => $data,
        ]);

        return true;
    }
}

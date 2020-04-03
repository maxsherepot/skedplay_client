<?php

namespace Modules\Api\Components;

class NotifyAdminTelegramComponent
{
    public function sendNotification(string $text): bool
    {
        $apiToken = env('TELEGRAM_TOKEN');

        $data = [
           'chat_id' => env('TELEGRAM_ADMIN_CHANNEL'),
            'text' => $text
        ];

        $url = 'https://api.telegram.org/bot'.$apiToken.'/sendMessage?'.http_build_query($data);

        file_get_contents($url);
        return true;
    }
}

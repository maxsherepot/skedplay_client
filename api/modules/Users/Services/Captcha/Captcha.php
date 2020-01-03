<?php declare(strict_types=1);

namespace Modules\Users\Services\Captcha;

use GuzzleHttp\Client;

trait Captcha
{
    protected function checkRecaptcha($token, $ip)
    {
        $response = (new Client)->post('https://www.google.com/recaptcha/api/siteverify', [
            'form_params' => [
                'secret'   => config('recaptcha.secret'),
                'response' => $token,
                'remoteip' => $ip,
            ],
        ]);
        $response = json_decode((string)$response->getBody(), true);

        return $response['success'];
    }
}
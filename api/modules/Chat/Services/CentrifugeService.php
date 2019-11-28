<?php


namespace Modules\Chat\Services;


use GuzzleHttp\Client;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

class CentrifugeService
{
    const API_URL = 'api';

    protected $client;

    protected $jwt_token = [];

    public function __construct()
    {
        $this->client = new Client(['base_uri' => $this->getBaseUrl()]);
    }

    public function publish($channel, array $data)
    {
        $params = ['data' => $data, 'channel' => $channel];
        $this->callMethod('publish', $params);
    }

    public function unsubscribe($channel, $user_id)
    {
        $data = ['channel' => $channel, 'user' => $user_id];
        $this->callMethod('publish',  $data);
    }

    public function disconnect($user_id)
    {
        $this->callMethod('disconnect', ['user'=>$user_id]);
    }

    public function broadcast($channels, $data)
    {
        $params = ['channels' => $channels, 'data' => $data];
        $this->callMethod('broadcast', $params);
    }

    public function presence($channel)
    {
        $this->callMethod('presence', ['channel' => $channel]);
    }

    public function presenceStats($channel)
    {
        $this->callMethod('presence_stats', ['channel'=>$channel]);
    }

    public function history($channel)
    {
        $this->callMethod('history', ['channel'=>$channel]);
    }

    protected function callMethod($method, $params)
    {
        $params = json_encode(['method'=>$method, 'params'=>$params]);

        $headers = [
            'Authorization' => 'apikey '. $this->getApiKey(),
            'Content-type' => 'application/json'
        ];

        $this->client->post(self::API_URL, ['body' => $params, 'headers' => $headers ]);
    }

    protected function getBaseUrl()
    {
        $domain = config('chat.centrifuge_domain', '');
        if (empty($domain)) {
            throw new \Exception('Set CENTRIFUGE_CONFIG in .env file!');
        }

        if (strrpos($domain, '/') === (strlen($domain) - 1)) {
            return substr($domain, 0, -1);
        }

        return $domain;
    }

    protected function getApiKey()
    {
        $key = config('chat.centrifuge_api_key', '');
        if (empty($key)) {
            throw new \Exception('Set CENTRIFUGE_API_KEY in .env file!');
        }

        return $key;
    }

}
<?php declare(strict_types=1);

namespace Modules\Common\Services\Location;

use GuzzleHttp\Client;
use Modules\Common\Entities\City;

class LocationCoordinatesAddressService
{
    /**
     * @var string
     */
    private $apiKey;
    /**
     * @var Client
     */
    private $client;

    public function __construct()
    {
        $this->apiKey = config('services.google_maps.api_key');
        $this->client = new Client([
            'http_errors' => false
        ]);
    }

    public function getCityAndCoordinatesByAddress(string $address): array
    {
        $url = 'https://maps.googleapis.com/maps/api/geocode/json';

        $query = http_build_query([
            'address' => $address,
            'key' => $this->apiKey,
        ]);

        $url .= '?' . $query;

        $response = $this->client->get($url);

        $responseData = json_decode($response->getBody()->getContents(), true);

        if (!$response || ($responseData['status'] ?? null) !== 'OK') {
            throw new \Exception('google_map_api_request_fail');
        }

        $addressComponents = collect($responseData['results'][0]['address_components']);

        $cityComponent = $addressComponents->filter(function($addressComponent) {
            return array_diff($addressComponent['types'], ["locality", "political"]) === [];
        })->first();

        $city = $cityComponent['long_name'];

        $cityModel = City::query()->firstOrCreate(['name' => $city]);

        return [
            $cityModel,
            new Coordinates(
                $responseData['results'][0]['geometry']['location']['lat'],
                $responseData['results'][0]['geometry']['location']['lng']
            )
        ];
    }

    public function getCoordinatesByAddress(string $address): Coordinates
    {
        $url = 'https://maps.googleapis.com/maps/api/geocode/json';

        $query = http_build_query([
            'address' => $address,
            'key' => $this->apiKey,
        ]);

        $url .= '?' . $query;

        $response = $this->client->get($url);

        $responseData = json_decode($response->getBody()->getContents(), true);

        if (!$response || ($responseData['status'] ?? null) !== 'OK') {
            throw new \Exception('google_map_api_request_fail');
        }

        return new Coordinates(
            $responseData['results'][0]['geometry']['location']['lat'],
            $responseData['results'][0]['geometry']['location']['lng']
        );
    }
}

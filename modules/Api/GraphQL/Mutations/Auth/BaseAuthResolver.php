<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations\Auth;

use Illuminate\Http\Request;
use Nuwave\Lighthouse\Exceptions\AuthenticationException;

class BaseAuthResolver
{
    /**
     * @param array $args
     * @param string $grantType
     * @return mixed
     */
    public function buildCredentials(array $args = [], $grantType = "password")
    {
        $credentials = collect($args)->get('data');
        $credentials['client_id'] = config('passport.client_id');
        $credentials['client_secret'] = config('passport.client_secret');
        $credentials['grant_type'] = $grantType;
        return $credentials;
    }

    /**
     * @param array $credentials
     * @return mixed
     * @throws AuthenticationException
     */
    public function makeRequest(array $credentials)
    {
        $request = Request::create('oauth/token', 'POST', $credentials, [], [], [
            'HTTP_Accept' => 'application/json'
        ]);
        $response = app()->handle($request);
        $decodedResponse = json_decode($response->getContent(), true);
        if ($response->getStatusCode() != 200) {
            throw new AuthenticationException($decodedResponse['message']);
        }
        return $decodedResponse;
    }
}
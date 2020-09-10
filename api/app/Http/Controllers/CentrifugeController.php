<?php

namespace App\Http\Controllers;

use LaraComponents\Centrifuge\Centrifuge;

class CentrifugeController extends Controller
{
    public function config(\phpcent\Client $client)
    {
        $config = config('broadcasting.connections.centrifuge');
        $user = auth('api')->id() ?? uniqid('', true);
        $timestamp = time();

        $token = $client->generateConnectionToken($user);

        $res = [
            'url'       => $config['external_url'].'/connection/sockjs',
            'user'      => $user,
            'secret'    => $config['secret'],
            'timestamp' => $timestamp,
            'token'     => $token,
        ];

        return $res;
    }

//    /**
//     * @param Centrifuge $centrifuge
//     * @return array
//     */
//    public function config(Centrifuge $centrifuge)
//    {
//        $config = config('broadcasting.connections.centrifuge');
//        $user = auth()->id() ?? uniqid('', true);
//        $timestamp = time();
//        $token = $centrifuge->generateToken($user, $timestamp);
//
//        $res = [
//            'url' => $config['external_url'] . '/connection/sockjs',
//            'user' => $user,
//            'secret' => $config['secret'],
//            'timestamp' => $timestamp,
//            'token' => $token,
//        ];
//
//        return $res;
//    }
}

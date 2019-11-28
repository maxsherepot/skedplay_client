<?php


namespace Modules\Chat\Http\Controllers;

use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Nwidart\Modules\Routing\Controller;

class CentrifugeController extends Controller
{
    public function auth(Request $request)
    {
        $request->validate([
            'client' => 'required|string',
            'channel' => 'required|array',
            'channel.*' => 'required|string'
        ]);

        return JWT::encode($request->only(['channel', 'client']), config('chat.centrifuge_secret'),'HS256');
    }
}
<?php

namespace Modules\Main\Http\Controllers\Activation;

use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Main\Factory\Activation\ActivationServiceFactory;

class ConfirmController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param $type string
     * @param $token string
     *
     * @return Response
     */
    public function __invoke($type, $token)
    {
        return ActivationServiceFactory::driver($type)->confirm($token);
    }
}

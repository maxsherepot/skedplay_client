<?php

return [

    /** The default gateway name */
    'gateway' => 'PayPal_Express',

    /** The default settings, applied to all gateways */
    'defaults' => [
        'testMode' => true,
    ],

    /** Gateway specific parameters */
    'gateways' => [
        'PayPal_Express' => [
            'username'    => 'bat.format-facilitator@gmail.com',
            'landingPage' => ['billing', 'login'],
        ],
    ],

];

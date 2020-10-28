<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Driver
    |--------------------------------------------------------------------------
    |
    | This value determines which of the following gateway to use.
    | You can switch to a different driver at runtime.
    |
    */
    'default' => env('SMS_DRIVER', 'logger'),
    /*
    |--------------------------------------------------------------------------
    | List of Drivers
    |--------------------------------------------------------------------------
    |
    | These are the list of drivers to use for this package.
    | You can change the name. Then you'll have to change
    | it in the map array too.
    |
    */
    'drivers' => [
        'logger' => [
            'from' => 'Skedpay',
        ],
        // Install: composer require nexmo/client
        'nexmo'  => [
            'key'    => env('NEXMO_API_KEY', null),
            'secret' => env('NEXMO_API_SECRET', null),
            'from'   => 'Skedpay',
        ],
        'plivo' => [
            'key'    => env('PLIVO_AUTH_ID'),
            'secret' => env('PLIVO_AUTH_TOKEN'),
            'from'   => env('PLIVO_FROM'),
        ],
    ],
    /*
    |--------------------------------------------------------------------------
    | Class Maps
    |--------------------------------------------------------------------------
    |
    | This is the array of Classes that maps to Drivers above.
    | You can create your own driver if you like and add the
    | config in the drivers array and the class to use for
    | here with the same name. You will have to extend
    | \Modules\Users\Services\Sms\Abstracts\Driver in your driver.
    |
    */
    'map'     => [
        'logger' => \Modules\Users\Services\Sms\Drivers\Logger::class,
        'nexmo'  => \Modules\Users\Services\Sms\Drivers\Nexmo::class,
        'plivo'  => \Modules\Users\Services\Sms\Drivers\Plivo::class,
    ],
];

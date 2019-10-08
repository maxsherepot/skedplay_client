<?php

use Modules\Employees\Entities\Parameter;

return [
    'hair' => [
        Parameter::HAIR_BLACK => 'Black',
        Parameter::HAIR_WHITE => 'White',
    ],

    'eye' => [
        Parameter::EYE_GREEN => 'Green',
        Parameter::EYE_BLUE  => 'Blue',
    ],

    'body' => [
        Parameter::BODY_FITNESS => 'Fitness',
    ],

    'growth' => ':parameter', // Todo: Have unit?

    'weight' => ':parameter', // Todo: Have unit?

    'breast_size' => ':parameter',
];

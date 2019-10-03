<?php

namespace Modules\Api\GraphQL\Type;

use Carbon\Carbon;

class DateType
{
    /**
     * @param $rootValue
     * @return string
     */
    function createdAt($rootValue)
    {
        return Carbon::parse($rootValue->created_at)->format('d.m.Y');
    }
}
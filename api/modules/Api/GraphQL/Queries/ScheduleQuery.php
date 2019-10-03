<?php

namespace Modules\Api\GraphQL\Queries;

use Carbon\Carbon;
use Carbon\CarbonPeriod;

class ScheduleQuery
{
    public function __invoke($rootValue, array $args)
    {
        $now = Carbon::now();
        $startOfWeek = $now->startOfWeek();
        $period = CarbonPeriod::create($startOfWeek, 7);

        $dates = [];
        foreach ($period as $key => $date) {
            $dates[] = [
                'day'  => $date->dayOfWeek,
                'date' => $date->format('d.m')
            ];
        }

        return $dates;
    }
}

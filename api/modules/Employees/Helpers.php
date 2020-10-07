<?php

namespace Modules\Employees;

use Modules\Events\Entities\Event;
use Modules\Employees\Entities\Employee;
use Modules\Common\Helpers as CommonHelpers;

class Helpers
{
    public static function createFrontLink(Employee $employee) : string
    {
        $employee->load('city.canton');
        $localePath = CommonHelpers::frontLocalePath();

        if (isset($employee->city)) {
            return config('app.front_app_url') .
                $localePath .
                '/' . strtolower($employee->readableType) .
                '/' . $employee->city->canton->slug .
                '/' . $employee->city->slug .
                '/' . $employee->id .
                '/information';
        }

        return config('app.front_app_url') .
            $localePath .
            '/employees' .
            '/' . $employee->id .
            '/information';
    }

    public static function createFrontEventLink(Employee $employee, Event $event) : string
    {
        $employee->load('city.canton');
        $localePath = CommonHelpers::frontLocalePath();

        if (isset($employee->city)) {
            return config('app.front_app_url') .
                $localePath .
                '/' . strtolower($employee->readableType) .
                '/' . $employee->city->canton->slug .
                '/' . $employee->city->slug .
                '/' . $employee->id .
                '/events/' . $event->id;
        }

        return config('app.front_app_url') .
            $localePath .
            '/employees' .
            '/' . $employee->id .
            '/events/' . $event->id;
    }

}

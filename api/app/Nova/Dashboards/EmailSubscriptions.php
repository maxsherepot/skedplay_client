<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\ClubEmailSubscriptions;
use App\Nova\Metrics\ClubEmailSubscriptionsPerDay;
use App\Nova\Metrics\EmployeeEmailSubscriptions;
use App\Nova\Metrics\EmployeeEmailSubscriptionsPerDay;
use Laravel\Nova\Dashboard;

class EmailSubscriptions extends Dashboard
{
    /**
     * Get the displayable name of the dashboard.
     *
     * @return string
     */
    public static function label()
    {
        return 'Email Subscriptions';
    }

    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new ClubEmailSubscriptions(),
            (new ClubEmailSubscriptionsPerDay())->width('2/3'),
            // new EmployeeEmailSubscriptions,
            // (new EmployeeEmailSubscriptionsPerDay)->width('2/3')
        ];
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public static function uriKey()
    {
        return 'email-subscriptions';
    }
}

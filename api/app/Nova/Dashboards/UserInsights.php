<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\NewUsers;
use App\Nova\Metrics\UsersPerDay;
use Laravel\Nova\Dashboard;

class UserInsights extends Dashboard
{
    /**
     * Get the displayable name of the dashboard.
     *
     * @return string
     */
    public static function label()
    {
        return 'User Insights';
    }

    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new NewUsers(),
            (new UsersPerDay())->width('2/3'),
        ];
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public static function uriKey()
    {
        return 'user-insights';
    }
}

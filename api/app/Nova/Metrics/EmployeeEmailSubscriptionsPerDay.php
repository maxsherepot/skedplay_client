<?php

namespace App\Nova\Metrics;

use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Metrics\Trend;
use Modules\Common\Entities\SubscribeEmployee;

class EmployeeEmailSubscriptionsPerDay extends Trend
{
    public function name()
    {
        return 'Employee Subscriptions Per Day';
    }

    /**
     * Calculate the value of the metric.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     *
     * @return mixed
     */
    public function calculate(NovaRequest $request)
    {
        return $this->countByDays($request, SubscribeEmployee::class);
    }

    /**
     * Get the ranges available for the metric.
     *
     * @return array
     */
    public function ranges()
    {
        return [
            30 => '30 Days',
            60 => '60 Days',
            90 => '90 Days',
        ];
    }

    /**
     * Determine for how many minutes the metric should be cached.
     *
     * @return \DateTimeInterface|\DateInterval|float|int
     */
    public function cacheFor()
    {
        // return now()->addMinutes(5);
    }

    /**
     * Get the URI key for the metric.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'employee-email-subscriptions-per-day';
    }
}

<?php

namespace Modules\Common\Entities\Traits;

trait Schedulable
{
    public function initializeAppendAttributeTrait()
    {
        $this->append('day_name');
    }

    /**
     * @return array|string|null
     */
    public function getDayNameAttribute()
    {
        return __('schedule.day.' . $this->attributes['day']);
    }

    /**
     * Scope a query to sort order.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrder($query)
    {
        return $query->orderBy('order', 'asc');
    }
}

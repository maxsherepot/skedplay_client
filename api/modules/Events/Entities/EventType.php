<?php

namespace Modules\Events\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Common\Entities\Traits\NameSlugable;

class EventType extends Model
{
    use SoftDeletes, NameSlugable;

    public $timestamps = false;

    protected $appends = [
        'display_name'
    ];

    public function getDisplayNameAttribute()
    {
        return __("events_type.".$this->attributes['name']);
    }
}

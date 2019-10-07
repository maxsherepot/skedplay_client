<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Common\Entities\Traits\NameSlugable;

class PriceType extends Model
{
    use SoftDeletes, NameSlugable;

    public $timestamps = false;

    protected $appends = [
      'display_name'
    ];

    public function getDisplayNameAttribute()
    {
      return __("price_types." . $this->attributes['name']);
    }
}

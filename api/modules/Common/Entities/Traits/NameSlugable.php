<?php

namespace Modules\Common\Entities\Traits;

use Illuminate\Support\Str;

trait NameSlugable
{


    public function initializeNameSlugable()
    {
        $this->fillable[] = 'name';
    }

    /**
     * Set the price type's name in slug format.
     *
     * @param string $value
     * @return void
     */
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = Str::slug($value);
    }
}

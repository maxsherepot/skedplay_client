<?php

namespace Modules\Common\Entities\Traits;

use Illuminate\Support\Str;

trait NameSlugable
{
    private $separator = '_';

    public function initializeNameSlugable()
    {
        $this->fillable[] = 'name';
    }

    /**
     * @param $separator
     */
    public function setSeparator($separator)
    {
        $this->separator = $separator;
    }

    /**
     * Set the price type's name in slug format.
     *
     * @param string $value
     * @return void
     */
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = Str::slug($value, $this->separator);
    }
}

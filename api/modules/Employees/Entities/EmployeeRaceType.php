<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Modules\Common\Entities\Traits\NameSlugable;

class EmployeeRaceType extends Model
{
    use NameSlugable;

    public $timestamps = false;

    protected $appends = ['slug'];

    public function getSlugAttribute(): string
    {
        return Str::slug($this->name);
    }
}

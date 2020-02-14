<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Common\Entities\Traits\NameSlugable;
use Modules\Employees\Entities\Employee;

class Service extends Model
{

    use SoftDeletes, NameSlugable;

    public $timestamps = false;

    public function employees()
    {
        return $this->morphToMany(Employee::class, 'serviceable')->withPivot('price');
    }
}

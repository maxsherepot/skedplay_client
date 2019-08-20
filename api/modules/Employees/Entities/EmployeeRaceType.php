<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\Traits\NameSlugable;

class EmployeeRaceType extends Model
{
    use NameSlugable;

    public $timestamps = false;
}

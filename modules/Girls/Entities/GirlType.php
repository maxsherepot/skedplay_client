<?php

namespace Modules\Girls\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\Traits\NameSlugable;

class GirlType extends Model
{
    use NameSlugable;

    public $timestamps = false;
}

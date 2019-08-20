<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Common\Entities\Traits\NameSlugable;

class PriceType extends Model
{

    use SoftDeletes, NameSlugable;

    public $timestamps = false;
}

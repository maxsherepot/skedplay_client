<?php

namespace Modules\Clubs\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\Traits\NameSlugable;

class ClubType extends Model
{
    use NameSlugable;

    public $timestamps = false;
}

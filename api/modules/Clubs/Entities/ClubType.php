<?php

namespace Modules\Clubs\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Modules\Common\Entities\Traits\NameSlugable;

class ClubType extends Model
{
    use NameSlugable;

    protected $appends = ['slug'];

    public $timestamps = false;

    public function getSlugAttribute(): string
    {
        return Str::slug($this->name);
    }
}

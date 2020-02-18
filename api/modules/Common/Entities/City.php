<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = ['name', 'canton_id'];
}

<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = [
        'name',
        'code',
        'active',
    ];
}

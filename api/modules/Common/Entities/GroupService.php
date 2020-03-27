<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;

class GroupService extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'id', 'name'
    ];
}

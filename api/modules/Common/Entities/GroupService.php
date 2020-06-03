<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;

/**
 * Class GroupService
 * @package Modules\Common\Entities
 * @property int $id
 * @property string name
 */
class GroupService extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'id', 'name'
    ];
}

<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;

/**
 * Class GroupService
 * @package Modules\Common\Entities
 * @property int $id
 * @property string name
 */
class GroupServiceAllLangs extends Model
{
    protected $table = 'group_services';

    public $timestamps = false;

    public function services()
    {
        return $this->hasMany(ServiceAllLangs::class,  'group_id');
    }
}

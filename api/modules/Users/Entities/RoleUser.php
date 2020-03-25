<?php

namespace Modules\Users\Entities;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RoleUser extends Pivot
{
    public $incrementing = true;
    public $timestamps = false;
    protected $table = 'role_user';
}

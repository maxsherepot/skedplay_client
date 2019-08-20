<?php

namespace Modules\Users\Entities;

use Laratrust\Models\LaratrustRole;

class Role extends LaratrustRole
{

    const CLIENT = 'client';
    const CLUB_OWNER = 'club_owner';
    const EMPLOYEE_OWNER = 'employee';
}

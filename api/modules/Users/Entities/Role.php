<?php

namespace Modules\Users\Entities;

use Laratrust\Models\LaratrustRole;

class Role extends LaratrustRole
{

    const CLIENT = 'client';
    const MODERATOR = 'moderator';
    const CLUB_OWNER = 'club_owner';
    const EMPLOYEE_OWNER = 'employee';
    const MANAGER = 'manager';
    const ADMIN = 'admin';
}

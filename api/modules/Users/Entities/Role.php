<?php

namespace Modules\Users\Entities;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laratrust\Models\LaratrustRole;

class Role extends LaratrustRole
{
    public $incrementing = true;

    const CLIENT = 'client';
    const MODERATOR = 'moderator';
    const CLUB_OWNER = 'club_owner';
    const EMPLOYEE_OWNER = 'employee';
    const MANAGER = 'manager';
    const ADMIN = 'admin';

    /**
     * @return BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot('user_type','role_id');
    }
}

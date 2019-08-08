<?php

namespace Modules\Users\Entities;

use Laratrust\Models\LaratrustPermission;

class Permission extends LaratrustPermission
{
    const USERS_CREATE = 'users-create';
    const USERS_READ = 'users-read';
    const USERS_UPDATE = 'users-update';
    const USERS_DELETE = 'users-delete';

    const CLUBS_CREATE = 'clubs-create';
    const CLUBS_READ = 'clubs-read';
    const CLUBS_UPDATE = 'clubs-update';
    const CLUBS_DELETE = 'clubs-delete';

    const GIRLS_CREATE = 'girls-create';
    const GIRLS_READ = 'girls-read';
    const GIRLS_UPDATE = 'girls-update';
    const GIRLS_DELETE = 'girls-delete';

    const EVENTS_CREATE = 'events-create';
    const EVENTS_READ = 'events-read';
    const EVENTS_UPDATE = 'events-update';
    const EVENTS_DELETE = 'events-delete';


}

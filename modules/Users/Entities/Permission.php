<?php

namespace Modules\Users\Entities;

use Laratrust\Models\LaratrustPermission;

class Permission extends LaratrustPermission
{
    const CREATE_USERS = 'create-users';
    const READ_USERS = 'read-users';
    const UPDATE_USERS = 'update-users';
    const DELETE_USERS = 'delete-users';

    const CREATE_CLUBS = 'create-clubs';
    const READ_CLUBS = 'read-clubs';
    const UPDATE_CLUBS = 'update-clubs';
    const DELETE_CLUBS = 'delete-clubs';

    const CREATE_GIRLS = 'create-girls';
    const READ_GIRLS = 'read-girls';
    const UPDATE_GIRLS = 'update-girls';
    const DELETE_GIRLS = 'delete-girls';

    const CREATE_EVENTS = 'create-events';
    const READ_EVENTS = 'read-events';
    const UPDATE_EVENTS = 'update-events';
    const DELETE_EVENTS = 'delete-events';


}

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

    const CREATE_EMPLOYEES = 'create-employees';
    const READ_EMPLOYEES = 'read-employees';
    const UPDATE_EMPLOYEES = 'update-employees';
    const DELETE_EMPLOYEES = 'delete-employees';

    const CREATE_EVENTS = 'create-events';
    const READ_EVENTS = 'read-events';
    const UPDATE_EVENTS = 'update-events';
    const DELETE_EVENTS = 'delete-events';

    const CREATE_SERVICES = 'create-services';
    const READ_SERVICES = 'read-services';
    const UPDATE_SERVICES = 'update-services';
    const DELETE_SERVICES = 'delete-services';

    const CREATE_PRICES = 'create-prices';
    const READ_PRICES = 'read-prices';
    const UPDATE_PRICES = 'update-prices';
    const DELETE_PRICES = 'delete-prices';
}

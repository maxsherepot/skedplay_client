<?php

return [
    'role_structure' => [
        'administrator' => [
            'users' => 'c,r,u,d',
        ],
        'user' => [
            'users' => 'r,u'
        ],
        'manager' => [
            'users' => 'c,r,u,d'
        ],
    ],
    'permission_structure' => [
        'cru_user' => [
            'users' => 'c,r,u'
        ],
    ],
    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete'
    ]
];

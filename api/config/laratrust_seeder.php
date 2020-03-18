<?php

return [
    'role_structure'       => [
        'admin'      => [
            'users'     => 'c,r,u,d',
            'clubs'     => 'c,r,u,d',
            'employees' => 'c,r,u,d',
            'events'    => 'c,r,u,d',
            'services'  => 'c,r,u,d',
            'prices'    => 'c,r,u,d',
        ],
        'moderator'  => [
            'users'     => 'c,r,u,d',
            'clubs'     => 'c,r,u,d',
            'employees' => 'r,u',
            'events'    => 'r,u',
            'services'  => 'r,u',
            'prices'    => 'r,u',

        ],
        'client'     => [
            'users'     => 'r,u',
            'clubs'     => 'r',
            'employees' => 'r',
            'events'    => 'r',
            'services'  => 'r',
            'prices'    => 'r',
        ],
        'employee'   => [
            'users'     => 'r,u',
            'clubs'     => 'r',
            'employees' => 'c,r,u,d',
            'events'    => 'c,r,u,d',
            'services'  => 'c,r,u,d',
            'prices'    => 'c,r,u,d',
        ],
        'club_owner' => [
            'users'     => 'r,u',
            'clubs'     => 'c,r,u,d',
            'employees' => 'c,r,u,d',
            'events'    => 'c,r,u,d',
            'services'  => 'c,r,u,d',
            'prices'    => 'c,r,u,d',
        ],
        'manager' => [
            'users'     => 'r',
            'clubs'     => 'c,r,u',
            'employees' => 'r',
            'events'    => 'r',
            'services'  => 'r',
            'prices'    => 'r',
        ],
    ],
    'permission_structure' => [
//        'cru_user' => [
//            'users' => 'c,r,u'
//        ],
    ],
    'permissions_map'      => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete'
    ]
];

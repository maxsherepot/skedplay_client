<?php

return [
    'role_structure'       => [
        'admin'      => [
            'users'     => 'c,r,u,d',
            'clubs'     => 'c,r,u,d',
            'employees' => 'c,r,u,d',
            'events'    => 'c,r,u,d',
        ],
        'moderator'  => [
            'users'     => 'c,r,u,d',
            'clubs'     => 'r,u',
            'employees' => 'r,u',
            'events'    => 'r,u',

        ],
        'client'     => [
            'users'     => 'r,u',
            'clubs'     => 'r',
            'employees' => 'r',
            'events'    => 'r',
        ],
        'employee'   => [
            'users'     => 'r,u',
            'clubs'     => 'r',
            'employees' => 'c,r,u,d',
            'events'    => 'c,r,u,d',
        ],
        'club_owner' => [
            'users'     => 'r,u',
            'clubs'     => 'c,r,u,d',
            'employees' => 'c,r,u,d',
            'events'    => 'c,r,u,d',
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

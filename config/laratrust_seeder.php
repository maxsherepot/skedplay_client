<?php

return [
    'role_structure'       => [
        'admin'      => [
            'users' => 'c,r,u,d',
        ],
        'client'     => [
            'users' => 'r,u'
        ],
        'model'      => [
            'users' => 'r,u'
        ],
        'club_owner' => [
            'users' => 'r,u'
        ],
        'moderator'  => [
            'users' => 'c,r,u,d'
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

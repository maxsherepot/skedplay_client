<?php

namespace Modules\Users\Entities;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\Authorizable;

class AuthUser extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;
}

<?php

namespace Modules\Users\Entities;

use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;

class AuthUser extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;
}

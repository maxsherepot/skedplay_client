<?php declare(strict_types=1);

namespace Modules\Users\Entities;

use Illuminate\Database\Eloquent\Model;

class PermissionPlan extends Model
{
    protected $table = 'permission_plan';

    const MAX_CLUB = 'max-club';

    const INFINITY = -1;
    const FALSE = null;
    const TRUE = 0;
}

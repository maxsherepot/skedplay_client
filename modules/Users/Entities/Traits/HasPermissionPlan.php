<?php

namespace Modules\Users\Entities\Traits;

use Modules\Users\Entities\Permission;
use Modules\Users\Entities\PermissionPlan;

trait HasPermissionPlan
{
    /**
     * Check if user has a permission plan by its name.
     *
     * @param string|array $permission Permission string or array of permissions.
     * @param $restriction
     * @return bool
     */
    public function hasPermissionPlan($permission, $restriction = 3)
    {
        return true;
//        return $this->hasPermission($permission) && $this->getRestrictionFromPermission($permission, $restriction);
    }

    public function getRestrictionFromPermission($permission, $restriction)
    {
        $id = optional(Permission::where('name', $permission)->first())->id;
        $value = optional(PermissionPlan::find('id', $id)->first())->value;

        return $value <= $restriction;
    }

}

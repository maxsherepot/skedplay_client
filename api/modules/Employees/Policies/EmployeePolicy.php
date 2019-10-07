<?php declare(strict_types=1);

namespace Modules\Employees\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Employees\Entities\Employee;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class EmployeePolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
      return $user->hasPermission(Permission::CREATE_EMPLOYEES);
    }

    /**
     * @param User $user
     * @param Employee $employee
     * @return bool
     */
    public function update(User $user, Employee $employee): bool
    {
        return ($user->employees_club_owners->contains($employee->id) || $user->owns($employee, 'owner_id'))
            && $user->hasPermission(Permission::UPDATE_EMPLOYEES);
    }
}

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
        if ($user->hasRole('admin')) {
            return false;
        }

        return $user->hasPermission(Permission::CREATE_EMPLOYEES);
    }

    public function view(User $user)
    {
        return $user->hasRole('admin');
    }

    public function attachService()
    {
        return false;
    }

    public function attachAnyService()
    {
        return false;
    }

    public function detachService()
    {
        return false;
    }

    /**
     * @param User $user
     * @param Employee $employee
     * @return bool
     */
    public function update(User $user, Employee $employee): bool
    {
        if ($user->hasRole('admin')) {
            return false;
        }

        return ($user->employees_club_owners->contains($employee->id) || $user->owns($employee, 'owner_id'))
            && $user->hasPermission(Permission::UPDATE_EMPLOYEES);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        if ($user->hasRole('admin')) {
            return false;
        }

        return $user->hasPermission(Permission::DELETE_EMPLOYEES);
    }
}

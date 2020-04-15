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
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_CLUB_OWNER))
            && $user->hasPermission(Permission::CREATE_EMPLOYEES);
    }

    public function view(User $user): bool
    {
        return $user->hasPermission(Permission::READ_EMPLOYEES);
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
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_MODERATOR)
            || $user->employees_club_owners->contains($employee->id) || $user->owns($employee, 'owner_id'))
            && $user->hasPermission(Permission::UPDATE_EMPLOYEES);

    }

    /**
     * @param User $user
     * @param Employee $employee
     * @return bool
     */
    public function delete(User $user, Employee $employee): bool
    {
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->employees_club_owners->contains($employee->id)
            || $user->owns($employee, 'owner_id'))
            && $user->hasPermission(Permission::DELETE_EMPLOYEES);
    }
}

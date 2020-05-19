<?php declare(strict_types=1);

namespace Modules\Employees\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeComplaint;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class EmployeeComplaintPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return false;
    }

    public function view(User $user): bool
    {
        return $user->hasPermission(Permission::READ_EMPLOYEES);
    }

    public function update(User $user, EmployeeComplaint $employee): bool
    {
        return false;

    }

    public function delete(User $user, EmployeeComplaint $employee): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN);
    }
}

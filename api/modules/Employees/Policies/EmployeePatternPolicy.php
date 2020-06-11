<?php declare(strict_types=1);

namespace Modules\Employees\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;

class EmployeePatternPolicy
{
    use HandlesAuthorization;

    public function create(): bool
    {
        return false;
    }

    public function view(): bool
    {
        return true;
    }

    public function update(): bool
    {
        return true;

    }

    public function delete(): bool
    {
        return false;
    }
}

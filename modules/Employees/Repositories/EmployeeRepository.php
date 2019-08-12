<?php

namespace Modules\Employees\Repositories;

use Illuminate\Support\Collection;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;
use Modules\Users\Repositories\Traits\Mediable;

class EmployeeRepository
{
    use Statusable, Mediable;

    /**
     * @param EmployeeOwnerInterface $owner
     * @param Collection $data
     * @return mixed
     */
    public function store(EmployeeOwnerInterface $owner, Collection $data)
    {
        $employee = new Employee($data->toArray());
        $employee->owner()->associate($owner);

        $employee->save();

        return $employee;
    }

    /**
     * @param Employee $employee
     * @param Collection $collection
     * @return Employee
     */
    public function update(Employee $employee, Collection $collection): Employee
    {
        $employee->update($collection->toArray());

        return $employee;
    }

}

<?php

namespace Modules\Employees\Repositories;

use Illuminate\Support\Collection;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Traits\Mediable;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;

class EmployeeRepository implements HasMediable
{
    use Mediable;

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

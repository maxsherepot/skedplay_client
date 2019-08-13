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

    /**
     * @param Employee $employee
     * @param Collection $collection
     * @return Employee
     */
    public function syncServices(Employee $employee, Collection $collection): Employee
    {
        $services = collect(
            $collection->get('services')
        );

        $services = $services->mapWithKeys(function ($service) {
            return [
                $service['id'] => ['price' => $service['price']]
            ];
        });

        $employee->services()->sync($services);

        return $employee;
    }

    /**
     * @param Employee $employee
     * @param Collection $collection
     * @return Employee
     */
    public function syncPrices(Employee $employee, Collection $collection): Employee
    {
        $prices = collect(
            $collection->get('prices')
        );

        $prices = $prices->mapWithKeys(function ($price) {
            return [
                $price['id'] => ['price' => $price['price']]
            ];
        });

        $employee->prices()->sync($prices);

        return $employee;
    }

}

<?php

namespace Modules\Employees\Repositories;

use Illuminate\Support\Collection;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Entities\EmployeeScheduleWork;
use Modules\Common\Traits\Mediable;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;

class EmployeeRepository implements HasMediable
{
    use Mediable;

    /**
     * @param Collection $data
     * @return mixed
     */
    public function create(Collection $data)
    {
        $name = explode(' ', $data->get('name'));

        if (isset($name[0])) {
            $data->put('first_name', $name[0]);
        }
        if (isset($name[1])) {
            $data->put('last_name', $name[1]);
        }

        /** @var Employee $employee */
        $employee = $this->store(auth('api')->user(), $data);

        if ($parameters = $data->get('parameters')) {
            $mapped = [];

            foreach ($parameters as $key => $value) {
                $mapped[$key] = [
                    'value' => $value
                ];
            }

            $employee->parameters()->sync($mapped);
        }

        return $employee->toArray();
    }

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

        if ($parameters = $collection->get('parameters')) {
            $mapped = [];

            foreach ($parameters as $key => $value) {
                $mapped[$key] = [
                    'value' => $value
                ];
            }

            $employee->parameters()->sync($mapped);
        }

        return $employee;
    }

    /**
     * @param Employee $employee
     * @return bool|null
     * @throws \Exception
     */
    public function delete(Employee $employee)
    {
        return $employee->delete();
    }

    /**
     * @param Collection $collection
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function storeSchedule(Collection $collection): \Illuminate\Database\Eloquent\Model
    {
        return EmployeeScheduleWork::create($collection->toArray());
    }

    /**
     * @param Collection $collection
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function updateSchedule(Collection $collection): \Illuminate\Database\Eloquent\Model
    {
        $schedule = $collection->toArray();

        return EmployeeScheduleWork::updateOrCreate([
            'day'         => $schedule['day'],
            'employee_id' => $schedule['employee_id'],
        ], [
            'start'     => $schedule['start'],
            'end'       => $schedule['end'],
            'available' => $schedule['available'],
            'order'     => $schedule['order'],
            'club_id'   => $schedule['club_id'],
        ]);
    }

    /**
     * @param Employee $employee
     * @param Collection $collection
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function storeReview(Employee $employee, Collection $collection): \Illuminate\Database\Eloquent\Model
    {
        $userId = auth('api')->id();
        $collection->put('user_id', $userId);

        return $employee->reviews()->create($collection->toArray());
    }
}

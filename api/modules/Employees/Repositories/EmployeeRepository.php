<?php

namespace Modules\Employees\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Entities\EmployeeScheduleWork;
use Modules\Common\Traits\Mediable;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;
use Modules\Main\Entities\Language;

class EmployeeRepository implements HasMediable
{
    use Mediable;

    /**
     * @param Collection $data
     * @return mixed
     * @throws \Exception
     */
    public function create(Collection $data)
    {
        $user = auth('api')->user();

        if ($user->is_club_owner && $clubId = $data->get('club_id')) {
            $employeeOwner = $user->clubs()->findOrFail($clubId);
        } else {
            $employeeOwner = $user;

            if ($user->employee) {
                throw new \Exception('employee user can have only one ad');
            }
        }

        $name = explode(' ', $data->get('name'));

        if (isset($name[0])) {
            $data->put('first_name', $name[0]);
        }
        if (isset($name[1])) {
            $data->put('last_name', $name[1]);
        }

        /** @var Employee $employee */
        $employee = $this->store($employeeOwner, $data);

        $this->storeParameters($employee, $data);
        $this->storeLanguages($employee, $data);

        return $employee->toArray();
    }

    /**
     * @param EmployeeOwnerInterface $owner
     * @param Collection $data
     * @return mixed
     */
    public function store(EmployeeOwnerInterface $owner, Collection $data)
    {
        try {
            if ($data['birthday']) {
                $data['birthday'] = Carbon::parse($data['birthday']);
                $data['age'] = Carbon::parse($data['birthday'])->age;
            }
        } catch (\Exception $e) {
            $data['birthday'] = null;
        }

        $employee = new Employee($data->toArray());
        $employee->user_status = $owner->status;
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
        try {
            if ($collection['birthday']) {
                $collection['birthday'] = Carbon::parse($collection['birthday']);
                $collection['age'] = Carbon::parse($collection['birthday'])->age;
            }
        } catch (\Exception $e) {
            $collection['birthday'] = null;
        }

        $employee->update($collection->toArray());

        $this->storeParameters($employee, $collection);
        $this->storeLanguages($employee, $collection);

        return $employee;
    }

    /**
     * @param int $club_id
     * @param int $status
     */
    public function updateUserStatusByClubId(int $club_id, int $status): void
    {
        Employee::query()
            ->where([
                ['owner_type', '=','club'],
                ['owner_id', '=', $club_id],
            ])
            ->update(
                ['user_status' => $status]
            )
        ;
    }

    /**
     * @param int $user_id
     * @param int $status
     */
    public function updateUserStatusByUserId(int $user_id, int $status): void
    {
        Employee::query()
            ->where([
                ['owner_type', '=', 'user'],
                ['owner_id', '=', $user_id],
            ])
            ->update(
                ['user_status' => $status]
            )
        ;
    }

    /**
     * @param int $user_id
     * @return Collection
     */
    public function getEmployeeIdByUserId(int $user_id): Collection
    {
        return Employee::query()
            ->where('owner_id', '=', $user_id)
            ->get('id')
        ;
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
     * @param int $employeeId
     * @param Carbon|null $willActivatedAt
     */
    public function storeActivatedAt(int $employeeId, ?Carbon $willActivatedAt = null): void
    {
        if ($willActivatedAt) {
            $willActivatedAt->startOfDay();
        }

        if (!$willActivatedAt || $willActivatedAt <= now()) {
            Employee::whereId($employeeId)->update([
                'will_activate_at' => null,
                'active' => 1,
                'soon' => 0,
                'show_level' => Employee::SHOW_LEVEL_ACTIVE,
            ]);

            return;
        }

        $soon = $willActivatedAt->copy()->subDays(Employee::SOON_DAYS) < now();

        Employee::whereId($employeeId)->update([
            'will_activate_at' => $willActivatedAt,
            'active' => 0,
            'soon' => $soon ? 1 : 0,
            'show_level' => $soon ? Employee::SHOW_LEVEL_SOON : Employee::SHOW_LEVEL_HIDDEN,
        ]);
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

    private function storeParameters(Employee $employee, Collection $collection): void
    {
        $parameters = (array) $collection->get('parameters');

        if (!$parameters) {
            return;
        }

        $parametersKeys = collect($parameters)
            ->keys()
            ->map(function($param) {
                return intval($param);
            })
            ->toArray();

        $deleteParamsIds = $employee->parameters()
            ->pluck('parameter_id')
            ->filter(function($parameterId) use ($parametersKeys) {
                return !in_array($parameterId, $parametersKeys, true);
            });

        if ($deleteParamsIds->count()) {
            $employee->parameters()->whereIn('parameter_id', $deleteParamsIds)->delete();
        }

        foreach ($parameters as $key => $value) {
            $employee->parameters()->updateOrCreate([
                'parameter_id' => $key,
            ], [
                'parameter_option_id' => $value,
            ]);
        }
    }

    private function storeLanguages(Employee $employee, Collection $data): void
    {
        $languages = (array) $data->get('languages');

        if (!$languages) {
            return;
        }

        $languages = collect($languages);

        $languagesModels = Language::whereIn('code', $languages->pluck('code'))->get()->keyBy('code');

        $languagesForSync = $languages
            ->mapWithKeys(function($lang) use ($languagesModels) {
                $lang = (array) $lang;

                if (!isset($lang['stars']) || $lang['stars'] === '' || $lang['stars'] === null) {
                    return null;
                }

                $model = $languagesModels[$lang['code']] ?? null;

                if (!$model) {
                    return null;
                }

                return [
                    $model->id => [
                        'stars' => $lang['stars'],
                    ],
                ];
            })
            ->filter()
            ->toArray();

        $employee->languages()->sync($languagesForSync);
    }
}

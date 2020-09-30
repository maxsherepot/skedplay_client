<?php

namespace Modules\Employees\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Modules\Api\Components\NotifyAdminTelegramComponent;
use Modules\Clubs\Entities\Club;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Entities\EmployeeScheduleWork;
use Modules\Common\Entities\Setting;
use Modules\Common\Traits\Mediable;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;
use Modules\Main\Entities\Language;
use Modules\Users\Entities\User;

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
        /** @var User $user */
        $user = auth('api')->user();

        if (($user->is_club_owner || $user->is_moderator) && $clubId = $data->get('club_id')) {
            /** @var Club $employeeOwner */
            $employeeOwner = $user->clubs()->findOrFail($clubId);
        } else {
            $employeeOwner = $user;

            $maxCount = Setting::where('key', 'employee_cards_count')->first()->value ?? 20;

            if ($user->employees()->count() >= $maxCount) {
                throw new \Exception("employee user can have only $maxCount cards");
            }
        }

        $name = explode(' ', $data->get('name'));

        if (isset($name[0])) {
            $data->put('first_name', $name[0]);
        }
        if (isset($name[1])) {
            $data->put('last_name', $name[1]);
        }

        $data->put('active', 0);

        /** @var Employee $employee */
        $employee = $this->store($employeeOwner, $data);

        $this->storeParameters($employee, $data);
        $this->storeLanguages($employee, $data);

        $fakeEmployee = Employee::where('fake', 1)->first();

        if ($fakeEmployee) {
            $fakeEmployee->delete();
        }

        $message = 'A new employee had been registered for moderation '.rtrim(env('APP_URL'),'/').'/admin/resources/employees/'.$employee->id;

        try {
            (new NotifyAdminTelegramComponent)->sendNotification($message);
        } catch (\Exception $e) {
            Log::error($e->getMessage(), [$e->getTrace()]);
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
        try {
            if ($data['birthday']) {
                $data['birthday'] = Carbon::parse($data['birthday']);
                $data['age'] = Carbon::parse($data['birthday'])->age;
            }
        } catch (\Exception $e) {
            $data['birthday'] = null;
        }

        $employee = new Employee($data->toArray());
        $employee->user_status = $owner->status ?? 0;
        if (!$employee->type) {
            $employee->type = 1;
        }
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
        $user = auth('api')->user();

        try {
            if ($collection['birthday']) {
                $collection['birthday'] = Carbon::parse($collection['birthday']);
                $collection['age'] = Carbon::parse($collection['birthday'])->age;
            }
        } catch (\Exception $e) {
            $collection['birthday'] = null;
        }

        if ($collection->get('club_id')) {
            if ($employee->owner_type === 'club' && $employee->owner_id === $employee->club->id) {
                $collection['owner_id'] = $collection->get('club_id');
            }
        }

        if (intval($collection->get('active'))) {
            $maxActiveCount = Setting::where('key', 'employee_active_cards_count')->first()->value ?? 2;

            if ($user->employees()->where('active', 1)->count() >= $maxActiveCount) {
                throw new \Exception("employee user can have only $maxActiveCount active cards");
            }
        }

        $employee->update($collection->toArray());

        $employee->refresh()->updateShowLevel();
        $employee->save();

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
            'club_id'   => $schedule['club_id'] ?? null,
            'at_address'   => $schedule['at_address'] ?? false,
            'address'   => $schedule['address'] ?? null,
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

    public function storeCurrentPosition(Employee $employee, Collection $data): void
    {
        $employee->current_club_id = $data->get('club_id');
        $employee->current_address = $data->get('address');
        $employee->save();

        if (!$data->get('save_for_current_day')) {
            return;
        }

        $day = now()->format('w');

        /** @var EmployeeScheduleWork $schedule */
        $schedule = $employee->schedule()->where('day', $day)->first();

        if (!$schedule) {
            return;
        }

        $schedule->available = 1;
        $schedule->club_id = $employee->current_club_id;
        $schedule->at_address = $employee->current_address ? 1 : 0;
        $schedule->address = $employee->current_address;
        $schedule->save();
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

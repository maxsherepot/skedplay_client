<?php

namespace Modules\Common\Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Common\Entities\EmployeeScheduleWork;
use Modules\Employees\Entities\Employee;

class EmployeeScheduleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {
        if (EmployeeScheduleWork::count()) {
            return;
        }

        Model::unguard();

        $start = now();
        $this->command->info('Employee schedule seeder started');

        $employees = Employee::all();

        $week = [
            Carbon::MONDAY,
            Carbon::TUESDAY,
            Carbon::WEDNESDAY,
            Carbon::THURSDAY,
            Carbon::FRIDAY,
            Carbon::SATURDAY,
            Carbon::SUNDAY,
        ];

        foreach ($employees as $employee) {
            foreach ($week as $key => $day) {
                (new EmployeeScheduleWork())->create([
                    'day'         => $day,
                    'start'       => "10:00",
                    'end'         => "19:00",
                    'available'   => (bool)random_int(0, 1),
                    'order'       => $key,
                    'employee_id' => $employee->id,
                    'club_id'     => 1,
                ]);
            }
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }
}

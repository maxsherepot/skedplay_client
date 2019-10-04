<?php

namespace Modules\Common\Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Common\Entities\ClubScheduleWork;

class ClubScheduleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {
        Model::unguard();

        $start = now();
        $this->command->info('Club schedule seeder started');

        $week = [
            Carbon::MONDAY,
            Carbon::TUESDAY,
            Carbon::WEDNESDAY,
            Carbon::THURSDAY,
            Carbon::FRIDAY,
            Carbon::SATURDAY,
            Carbon::SUNDAY,
        ];

        foreach ($week as $key => $day) {
            (new ClubScheduleWork())->create([
                'day'       => $day,
                'start'     => "10:00",
                'end'       => "19:00",
                'available' => (bool)random_int(0, 1),
                'order'     => $key,
                'club_id'   => 1,
            ]);
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }
}

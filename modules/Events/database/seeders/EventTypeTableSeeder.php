<?php

namespace Modules\Events\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Events\Entities\EventType;

class EventTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $start = now();
        $this->command->info('Event Type seeder started');

        $eventTypes = [
            'Special day',
            'Parties and Shows',
            'Discount',
        ];

        foreach ($eventTypes as $name) {
            EventType::create([
                'name' => $name,
            ]);
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }
}

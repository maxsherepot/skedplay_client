<?php

namespace Modules\Main\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Main\Entities\EventType;

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

        foreach ($eventTypes as $type) {
            EventType::create([
                'name' => $type,
                'slug' => Str::slug($type),
            ]);
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }
}

<?php

namespace Modules\Main\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Main\Entities\Price;
use Illuminate\Database\Eloquent\Model;

class PriceTableSeeder extends Seeder
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
        $this->command->info('Price seeder started');

        $prices = [
            '15 min',
            '30 min',
            '45 min',
            '1 hour',
            '2 hours',
            '3 hours',
            'Night',
        ];

        foreach ($prices as $price) {
            Price::create([
                'name' => $price
            ]);
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }
}
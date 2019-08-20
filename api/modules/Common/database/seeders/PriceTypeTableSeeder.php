<?php

namespace Modules\Common\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Common\Entities\PriceType;

class PriceTypeTableSeeder extends Seeder
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
            PriceType::create([
                'name' => $price
            ]);
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }
}

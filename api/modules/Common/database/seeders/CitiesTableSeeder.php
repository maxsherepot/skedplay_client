<?php

namespace Modules\Common\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\City;

class CitiesTableSeeder extends Seeder
{
    private $cities = [
        'Zürich',
        'Geneva',
        'Basel',
        'Lausanne',
        'Bern',
        'Winterthur',
        'Lucerne',
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->command->info('Cities seeder started');

        collect($this->cities)->map(function($city) {
            City::updateOrCreate(['name' => $city]);
        });

        $this->command->info('Cities seeder finished');
    }
}

<?php

namespace Modules\Common\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\Canton;
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

        $cities = json_decode(
            file_get_contents(
                storage_path('cities.json')
            ),
            true
        );

        collect($cities)->map(function($city) {
            $canton = Canton::updateOrCreate(['name' => $city['admin']]);

            City::updateOrCreate([
                'name' => $city['city'],
            ], [
                'canton_id' => $canton->id,
            ]);
        });

        $this->command->info('Cities seeder finished');
    }
}

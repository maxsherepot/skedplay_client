<?php

namespace Modules\Employees\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Employees\Entities\EmployeeRaceType;

class EmployeeTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (['european', 'asian', 'african'] as $name) {
            EmployeeRaceType::create(compact('name'));
        }

    }
}

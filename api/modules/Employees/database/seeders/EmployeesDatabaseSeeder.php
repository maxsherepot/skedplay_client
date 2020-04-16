<?php

namespace Modules\Employees\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class EmployeesDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(EmployeeTypeTableSeeder::class);
        $this->call(EmployeeTableSeeder::class);
        $this->call(ParametersTableSeeder::class);
    }
}

<?php

namespace Modules\Main\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class MainDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(EventTypeTableSeeder::class);
        $this->call(ServiceTableSeeder::class);
        $this->call(PriceTableSeeder::class);
        $this->call(PlanTableSeeder::class);
    }
}

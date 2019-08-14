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

        $this->call(PlanTableSeeder::class);
        $this->call(PageTableSeeder::class);
        $this->call(FaqTableSeeder::class);
        $this->call(PlanPermissionTableSeeder::class);
    }
}

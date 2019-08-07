<?php

namespace Modules\Girls\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class GirlsDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(GirlTypeTableSeeder::class);
        $this->call(GirlTableSeeder::class);
    }
}

<?php

namespace Modules\Common\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CommonDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(PriceTypeTableSeeder::class);
        $this->call(ServiceTableSeeder::class);
    }
}

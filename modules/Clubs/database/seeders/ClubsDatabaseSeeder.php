<?php

namespace Modules\Clubs\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class ClubsDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(ClubTypeTableSeeder::class);
        $this->call(ClubTableSeeder::class);
    }
}

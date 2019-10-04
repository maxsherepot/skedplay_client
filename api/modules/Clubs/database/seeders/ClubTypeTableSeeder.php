<?php

namespace Modules\Clubs\database\seeders;

use Illuminate\Database\Seeder;
use Modules\Clubs\Entities\ClubType;

class ClubTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (['club', 'studio'] as $name) {
            ClubType::create(compact('name'));
        }
    }
}

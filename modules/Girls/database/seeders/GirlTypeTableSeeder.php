<?php

namespace Modules\Girls\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Girls\Entities\Girl;
use Modules\Girls\Entities\GirlType;

class GirlTypeTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (['european', 'asian', 'african'] as $name) {
            GirlType::create(compact('name'));
        }

    }
}

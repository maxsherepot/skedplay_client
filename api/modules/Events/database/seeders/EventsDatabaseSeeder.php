<?php

namespace Modules\Events\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class EventsDatabaseSeeder extends Seeder
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
        $this->call(EventTableSeeder::class);
    }
}

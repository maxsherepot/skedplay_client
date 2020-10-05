<?php

namespace Modules\Common\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $this->call(PriceTypeTableSeeder::class);
        $this->call(ServiceTableSeeder::class);
        $this->call(ReviewTableSeeder::class);
        $this->call(ClubScheduleTableSeeder::class);
        $this->call(CitiesTableSeeder::class);
        $this->call(ContactPhonesTableSeeder::class);
        $this->call(HelpCenterCategoryTableSeeder::class);
        $this->call(EmailTemplateTableSeeder::class);

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}

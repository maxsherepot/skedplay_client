<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BaseSeeder extends Seeder
{
    /**
     * @param $table
     * @param $insert
     * @param $images
     * @param $runForProd
     */
    public function rebuildTable($table, $insert, $runForProd = true)
    {
        if ($runForProd || (!$runForProd && !app()->environment('production'))) {
            DB::table($table)->delete();
            DB::statement('ALTER TABLE ' . $table . ' AUTO_INCREMENT = 1;');
            DB::table($table)->insert($insert);
        }
    }
}

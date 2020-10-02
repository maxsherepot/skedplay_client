<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeNameColumnToJsonInServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Illuminate\Support\Facades\DB::beginTransaction();

        $services = \Illuminate\Support\Facades\DB::table('services')->get()->toArray();

        foreach ($services as $service) {
            \Illuminate\Support\Facades\DB::table('services')
                ->where('id', $service->id)
                ->update([
                    'name' => json_encode(['en' => $service->name])
                ]);
        }

        Schema::table('services', function (Blueprint $table) {
            $table->json('name')->change();
        });

        \Illuminate\Support\Facades\DB::commit();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}

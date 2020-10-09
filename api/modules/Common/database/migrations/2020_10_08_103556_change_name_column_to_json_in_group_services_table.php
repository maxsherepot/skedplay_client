<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeNameColumnToJsonInGroupServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Illuminate\Support\Facades\DB::beginTransaction();

        $groupServices = \Illuminate\Support\Facades\DB::table('group_services')->get()->toArray();

        foreach ($groupServices as $groupService) {
            \Illuminate\Support\Facades\DB::table('group_services')
                ->where('id', $groupService->id)
                ->update([
                    'name' => json_encode(['en' => $groupService->name])
                ]);
        }

        Schema::table('group_services', function (Blueprint $table) {
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

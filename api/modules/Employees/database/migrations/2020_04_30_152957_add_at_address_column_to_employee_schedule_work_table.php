<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAtAddressColumnToEmployeeScheduleWorkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('employee_schedule_work', function (Blueprint $table) {
            $table->tinyInteger('at_address')->default(0)->after('club_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('employee_schedule_work', function (Blueprint $table) {
            $table->dropColumn('at_address');
        });
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddActivatedAtColumnToEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->timestamp('will_activate_at')->nullable()->after('lng');
            $table->tinyInteger('active')->default(1)->after('lng');
            $table->tinyInteger('soon')->default(0)->after('active');
            $table->tinyInteger('show_level')->default(1)->after('soon');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn('will_activate_at');
            $table->dropColumn('active');
            $table->dropColumn('soon');
            $table->dropColumn('show_level');
        });
    }
}

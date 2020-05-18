<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddManagerAssignmentDateToClubsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clubs', function (Blueprint $table) {
            $table->dateTime('manager_assignment_at')
                ->after('manager_status')
                ->nullable();

            $table->dateTime('comment_set_at')
                ->after('comment')
                ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clubs', function (Blueprint $table) {
            $table->dropColumn('manager_assignment_at');
            $table->dropColumn('comment_set_at');
        });
    }
}

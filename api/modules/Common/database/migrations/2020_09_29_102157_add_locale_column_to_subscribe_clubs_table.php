<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLocaleColumnToSubscribeClubsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscribe_clubs', function (Blueprint $table) {
            $table->string('locale', 10)->nullable()->after('club_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('subscribe_clubs', function (Blueprint $table) {
            $table->dropColumn('locale');
        });
    }
}

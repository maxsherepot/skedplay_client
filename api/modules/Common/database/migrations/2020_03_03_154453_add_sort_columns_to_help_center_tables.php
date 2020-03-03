<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSortColumnsToHelpCenterTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('help_center_categories', function (Blueprint $table) {
            $table->integer('sort_order')->default(0)->after('parent_id');
        });

        Schema::table('help_center_topics', function (Blueprint $table) {
            $table->integer('sort_order')->default(0)->after('content');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('help_center_categories', function (Blueprint $table) {
            $table->dropColumn('sort_order');
        });

        Schema::table('help_center_topics', function (Blueprint $table) {
            $table->dropColumn('sort_order');
        });
    }
}

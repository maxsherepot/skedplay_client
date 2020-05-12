<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSeoColumnsToHelpCenterTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('help_center_topics', function (Blueprint $table) {
            $table->json('keywords')->nullable()->after('content');
            $table->json('description')->nullable()->after('content');
            $table->json('title')->nullable()->after('content');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('help_center_topics', function (Blueprint $table) {
            $table->dropColumn(['title', 'description', 'keywords']);
        });
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCantonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cantons', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');

            $table->timestamps();
        });

        Schema::table('cities', function (Blueprint $table) {
            $table->unsignedBigInteger('canton_id')->nullable()->after('name');

            $table->foreign('canton_id')
                ->references('id')
                ->on('cantons');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cantons');

        Schema::table('cities', function (Blueprint $table) {
            $table->dropColumn('canton_id');
        });
    }
}

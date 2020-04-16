<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParameterOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parameter_options', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('parameter_id');
            $table->json('value');

            $table->timestamps();

            $table->foreign('parameter_id')
                ->references('id')
                ->on('parameters')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parameter_options');
    }
}

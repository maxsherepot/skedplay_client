<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeesTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('slug')->nullable();

            $table->integer('age');
            $table->tinyInteger('gender')->nullable();

            $table->unsignedInteger('race_type_id')->nullable();
            $table->unsignedInteger('type')->nullable();

            $table->morphs('owner');

            $table->string('description')->nullable();
            $table->text('text')->nullable();

            $table->boolean('isVip')->default(false);

            $table->string('address')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();

            $table->foreign('race_type_id')
                ->references('id')
                ->on('employee_race_types')
                ->onDelete('SET null');


            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeeParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_parameters', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('employee_id')->nullable();
            $table->unsignedInteger('parameter_id')->nullable();

            $table->string('value');

            $table->foreign('employee_id')
                ->references('id')
                ->on('employees')
                ->onDelete('SET null');

            $table->foreign('parameter_id')
                ->references('id')
                ->on('parameters')
                ->onDelete('SET null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_parameters');
    }
}

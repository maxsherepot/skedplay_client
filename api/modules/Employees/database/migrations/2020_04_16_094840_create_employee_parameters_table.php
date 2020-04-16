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
            $table->unsignedBigInteger('employee_id');
            $table->unsignedBigInteger('parameter_id');
            $table->unsignedBigInteger('parameter_option_id');

            $table->index(['employee_id', 'parameter_id']);

            $table->foreign('employee_id')
                ->references('id')
                ->on('employees')
                ->onDelete('cascade');

            $table->foreign('parameter_id')
                ->references('id')
                ->on('parameters')
                ->onDelete('cascade');

            $table->foreign('parameter_option_id')
                ->references('id')
                ->on('parameter_options')
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
        Schema::dropIfExists('employee_parameter');
    }
}

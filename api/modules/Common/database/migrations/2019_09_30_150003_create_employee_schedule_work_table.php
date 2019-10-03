<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeeScheduleWorkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_schedule_work', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('day')->nullable();

            $table->string('start')->nullable();
            $table->string('end')->nullable();

            $table->boolean('available')->default(1);

            $table->integer('order')->nullable();

            $table->unsignedBigInteger('employee_id')->nullable();

            $table->foreign('employee_id')
                ->references('id')
                ->on('employees')
                ->onDelete('SET null');

            $table->unsignedBigInteger('club_id')->nullable();

            $table->foreign('club_id')
                ->references('id')
                ->on('clubs')
                ->onDelete('SET null');

            $table->unique(['day', 'employee_id']);

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
        Schema::dropIfExists('employee_schedule_work');
    }
}

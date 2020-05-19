<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeeComplaintThemesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_complaint_themes', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->json('name');

            $table->timestamps();
        });

        \Illuminate\Support\Facades\DB::table('employee_complaint_themes')->insert([
            [
                'name' => json_encode(['en' => 'Another']),
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_complaint_themes');
    }
}

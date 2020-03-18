<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClubsTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clubs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('manager_id')->nullable();
            $table->unsignedBigInteger('moderator_id')->nullable();

            $table->string('name');
            $table->string('slug')->nullable();

            $table->unsignedInteger('club_type_id')->nullable();

            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->json('phones')->nullable();

            $table->text('description')->nullable();

            $table->string('address')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();


            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->foreign('moderator_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->foreign('manager_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->foreign('club_type_id')
                ->references('id')->on('club_types')
                ->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clubs');
    }
}

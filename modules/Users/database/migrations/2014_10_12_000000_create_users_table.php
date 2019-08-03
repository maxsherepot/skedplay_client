<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender')->nullable();
            $table->date('birthday')->nullable();
            $table->string('club_type')->nullable();
            $table->string('phone')->unique()->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('address')->nullable();
            $table->string('type')->nullable();
            $table->string('description')->nullable();
            $table->string('short_description')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->boolean('vip')->default(0);

            /** Cashier columns */
            $table->timestamp('trial_ends_at')->nullable();

            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->morphs('owner');

            $table->unsignedBigInteger('club_id');
            $table->unsignedInteger('event_type_id');

            $table->string('title');
            $table->longText('description');

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('event_type_id')
                ->references('id')->on('event_types')
                ->onDelete('cascade');

            $table->foreign('club_id')
                ->references('id')->on('clubs')
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
        Schema::dropIfExists('events');
    }
}

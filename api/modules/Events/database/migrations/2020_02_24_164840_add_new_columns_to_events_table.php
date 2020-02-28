<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewColumnsToEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('address')->nullable()->after('rejected_reason');
            $table->string('lat')->nullable()->after('address');
            $table->string('lng')->nullable()->after('lat');
            $table->tinyInteger('mode')->default(\Modules\Events\Entities\Event::MODE_REGULAR)->after('lng');
            $table->json('days')->nullable()->after('mode');
            $table->date('start_date')->nullable()->after('days');
            $table->date('end_date')->nullable()->after('start_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'address',
                'lat',
                'lng',
                'mode',
                'days',
                'start_date',
                'end_date',
            ]);
        });
    }
}

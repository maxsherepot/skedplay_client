<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaypalIpnRecords extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paypal_ipn_records', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('order_id')->nullable();
            $table->string('verified');
            $table->string('transaction_id');
            $table->string('payment_status');
            $table->string('request_method')->nullable();
            $table->string('request_url')->nullable();
            $table->longText('request_headers')->nullable();
            $table->longText('payload')->nullable();

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
        Schema::dropIfExists('paypal_ipn_records');
    }
}

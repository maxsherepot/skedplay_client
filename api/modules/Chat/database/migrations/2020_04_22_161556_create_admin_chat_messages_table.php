<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminChatMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_chat_messages', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->text('text')->nullable();
            $table->unsignedBigInteger('chat_id');
            $table->boolean('seen')->default(0);
            $table->tinyInteger('from_admin');

            $table->timestamps();

            $table->foreign('chat_id')
                ->references('id')
                ->on('admin_chats')
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
        Schema::dropIfExists('admin_chat_messages');
    }
}

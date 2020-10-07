<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Modules\Common\database\seeders\EmailTemplateTableSeeder;

class CreateEmailTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $models = array(
            array('name' => '...'),
        );
        Schema::create('email_templates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('key');
            $table->string('name');
            $table->string('subject_en');
            $table->string('subject_de');
            $table->string('subject_fr');
            $table->string('button_text_en');
            $table->string('button_text_de');
            $table->string('button_text_fr');
            $table->text('text_en');
            $table->text('text_de');
            $table->text('text_fr');
            $table->json('text_variables');
            $table->timestamps();
        });

        $seeder = new EmailTemplateTableSeeder();
        $seeder->run();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('email_templates');
    }
}

<?php

namespace Modules\Common\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\EmailTemplate;

class EmailTemplateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        return;


        DB::table('email_templates')->truncate();

        $templates = [
            [
                'name' => 'Club create event',
                'key' => 'club_create_event',
                'subject_en' => 'Club create new event',
                'subject_de' => 'de Club create new event',
                'subject_fr' => 'fr Club create new event',
                'button_text_en' => 'show event',
                'button_text_de' => 'de show event',
                'button_text_fr' => 'fr show event',
                'text_en' => 'new event {event_title} from {club_name}',
                'text_de' => 'de new event {event_title} from {club_name}',
                'text_fr' => 'fr new event {event_title} from {club_name}',
                'text_variables' => ['{event_title}', '{club_name}']
            ],
            // [
            //     'name' => 'Club update event',
            //     'key' => 'club_update_event',
            //     'subject_en' => 'Club update event',
            //     'subject_de' => 'de Club update event',
            //     'subject_fr' => 'fr Club update event',
            //     'button_text_en' => 'show event',
            //     'button_text_de' => 'de show event',
            //     'button_text_fr' => 'fr show event',
            //     'text_en' => 'update event {event_title} from {club_name}',
            //     'text_de' => 'de update event {event_title} from {club_name}',
            //     'text_fr' => 'fr update event {event_title} from {club_name}',
            //     'text_variables' => ['{event_title}', '{club_name}']
            // ],
            [
                'name' => 'Club update contacts',
                'key' => 'club_update_contact',
                'subject_en' => 'Club update contacts',
                'subject_de' => 'de Club update contacts',
                'subject_fr' => 'fr Club update contacts',
                'button_text_en' => 'show club profile',
                'button_text_de' => 'de show club profile',
                'button_text_fr' => 'fr show club profile',
                'text_en' => '{club_name} updating contacts',
                'text_de' => 'de {club_name} updating contacts',
                'text_fr' => 'fr {club_name} updating contacts',
                'text_variables' => ['{club_name}']
            ],
            [
                'name' => 'Club added new employee',
                'key' => 'club_new_employee',
                'subject_en' => 'Club added new employee',
                'subject_de' => 'de Club added new employee',
                'subject_fr' => 'fr Club added new employee',
                'button_text_en' => 'show club profile',
                'button_text_de' => 'de show club profile',
                'button_text_fr' => 'fr show club profile',
                'text_en' => '{club_name} updating contacts',
                'text_de' => 'de {club_name} added new employee',
                'text_fr' => 'fr {club_name} added new employee',
                'text_variables' => ['{club_name}', '{employee_name}']
            ],
            [
                'name' => 'Employee create event',
                'key' => 'employee_create_event',
                'subject_en' => 'Employee create event',
                'subject_de' => 'de Employee create event',
                'subject_fr' => 'fr Employee create event',
                'button_text_en' => 'show event',
                'button_text_de' => 'de show event',
                'button_text_fr' => 'fr show event',
                'text_en' => 'new event {event_title} from {emplayee_name}',
                'text_de' => 'de new event {event_title} from {emplayee_name}',
                'text_fr' => 'fr new event {event_title} from {emplayee_name}',
                'text_variables' => ['{event_title}', '{emplayee_name}']
            ],
            // [
            //     'name' => 'Employee update event',
            //     'key' => 'employee_update_event',
            //     'subject_en' => 'Employee update event',
            //     'subject_de' => 'de Employee update event',
            //     'subject_fr' => 'fr Employee update event',
            //     'button_text_en' => 'show event',
            //     'button_text_de' => 'de show event',
            //     'button_text_fr' => 'fr show event',
            //     'text_en' => 'update event {event_title} from {emplayee_name}',
            //     'text_de' => 'de update event {event_title} from {emplayee_name}',
            //     'text_fr' => 'fr update event {event_title} from {emplayee_name}',
            //     'text_variables' => ['{event_title}', '{emplayee_name}']
            // ],
            [
                'name' => 'Employee update contacts',
                'key' => 'employee_update_contact',
                'subject_en' => 'Girl update contacts',
                'subject_de' => 'de Girl update contacts',
                'subject_fr' => 'fr Girl update contacts',
                'button_text_en' => 'show profile',
                'button_text_de' => 'de show profile',
                'button_text_fr' => 'fr show profile',
                'text_en' => '{emplayee_name} update contacts',
                'text_de' => 'de {emplayee_name} update contacts',
                'text_fr' => 'fr {emplayee_name} update contacts',
                'text_variables' => ['{emplayee_name}']
            ],
            [
                'name' => 'Employee activated profile',
                'key' => 'employee_profile_activated',
                'subject_en' => 'Girl activated profile',
                'subject_de' => 'de Girl activated profile',
                'subject_fr' => 'fr Girl activated profile',
                'button_text_en' => 'show profile',
                'button_text_de' => 'de show profile',
                'button_text_fr' => 'fr show profile',
                'text_en' => '{emplayee_name} activated profile',
                'text_de' => 'de {emplayee_name} activated profile',
                'text_fr' => 'fr {emplayee_name} activated profile',
                'text_variables' => ['{emplayee_name}']
            ],
            [
                'name' => 'Employee added new photo or video',
                'key' => 'employee_added_new_photo_or_video',
                'subject_en' => 'Employee added new photo or video',
                'subject_de' => 'de Employee added new photo or video',
                'subject_fr' => 'fr Employee added new photo or video',
                'button_text_en' => 'show',
                'button_text_de' => 'de show',
                'button_text_fr' => 'fr show',
                'text_en' => '{emplayee_name} added new photo or video',
                'text_de' => 'de {emplayee_name} added new photo or video',
                'text_fr' => 'fr {emplayee_name} added new photo or video',
                'text_variables' => ['{emplayee_name}']
            ],
        ];

        foreach($templates as $template) {
            EmailTemplate::create($template);
        }
    }
}

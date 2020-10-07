<?php

namespace Modules\Common\Console;

use Illuminate\Console\Command;
use Modules\Common\Entities\EmailTemplate;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class EmailTemplatesInit extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'email_templates:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
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
            [
                'name' => 'Club update event',
                'key' => 'club_update_event',
                'subject_en' => 'Club update event',
                'subject_de' => 'de Club update event',
                'subject_fr' => 'fr Club update event',
                'button_text_en' => 'show event',
                'button_text_de' => 'de show event',
                'button_text_fr' => 'fr show event',
                'text_en' => 'update event {event_title} from {club_name}',
                'text_de' => 'de update event {event_title} from {club_name}',
                'text_fr' => 'fr update event {event_title} from {club_name}',
                'text_variables' => ['{event_title}', '{club_name}']
            ],
            [
                'name' => 'Club update profile',
                'key' => 'club_update_profile',
                'subject_en' => 'Club update profile',
                'subject_de' => 'de Club update profile',
                'subject_fr' => 'fr Club update profile',
                'button_text_en' => 'show profile',
                'button_text_de' => 'de show profile',
                'button_text_fr' => 'fr show profile',
                'text_en' => '{club_name} updating profile',
                'text_de' => 'de {club_name} updating profile',
                'text_fr' => 'fr {club_name} updating profile',
                'text_variables' => ['{club_name}']
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
                'text_en' => 'new event {event_title} from {employee_name}',
                'text_de' => 'de new event {event_title} from {employee_name}',
                'text_fr' => 'fr new event {event_title} from {employee_name}',
                'text_variables' => ['{event_title}', '{employee_name}']
            ],
            [
                'name' => 'Employee update event',
                'key' => 'employee_update_event',
                'subject_en' => 'Employee update event',
                'subject_de' => 'de Employee update event',
                'subject_fr' => 'fr Employee update event',
                'button_text_en' => 'show event',
                'button_text_de' => 'de show event',
                'button_text_fr' => 'fr show event',
                'text_en' => 'update event {event_title} from {employee_name}',
                'text_de' => 'de update event {event_title} from {employee_name}',
                'text_fr' => 'fr update event {event_title} from {employee_name}',
                'text_variables' => ['{event_title}', '{employee_name}']
            ],
            [
                'name' => 'Employee update position',
                'key' => 'employee_update_position',
                'subject_en' => 'Employee update position',
                'subject_de' => 'de Employee update position',
                'subject_fr' => 'fr Employee update position',
                'button_text_en' => 'show profile',
                'button_text_de' => 'de show profile',
                'button_text_fr' => 'fr show profile',
                'text_en' => '{employee_name} update position',
                'text_de' => 'de {employee_name} update position',
                'text_fr' => 'fr {employee_name} update position',
                'text_variables' => ['{employee_name}']
            ],
            [
                'name' => 'Employee update profile',
                'key' => 'employee_update_profile',
                'subject_en' => 'Employee update profile',
                'subject_de' => 'de Employee update profile',
                'subject_fr' => 'fr Employee update profile',
                'button_text_en' => 'show profile',
                'button_text_de' => 'de show profile',
                'button_text_fr' => 'fr show profile',
                'text_en' => '{employee_name} updating profile',
                'text_de' => 'de {employee_name} updating profile',
                'text_fr' => 'fr {employee_name} updating profile',
                'text_variables' => ['{employee_name}']
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
                'text_en' => '{employee_name} added new photo or video',
                'text_de' => 'de {employee_name} added new photo or video',
                'text_fr' => 'fr {employee_name} added new photo or video',
                'text_variables' => ['{employee_name}']
            ],
        ];

        foreach($templates as $template) {
            if (EmailTemplate::where('key', $template['key'])->first()) {
                continue;
            }

            EmailTemplate::create($template);
        }
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['example', InputArgument::REQUIRED, 'An example argument.'],
        ];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
        ];
    }
}

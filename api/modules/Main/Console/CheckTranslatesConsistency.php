<?php

namespace Modules\Main\Console;

use Illuminate\Console\Command;
use Modules\Main\Entities\Language;
use Modules\Main\Entities\UiTranslate;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class CheckTranslatesConsistency extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'translates:check';

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
        $enLang = Language::whereCode('en')->first();

        $enTranslates = UiTranslate::whereLanguageId($enLang->id)
            ->orderBy('id')
            ->get()
            ->filter(function($translate) {
                return mb_substr($translate->key, -1, 1) !== '.';
            })
            ->values();

        $notEnTranslatesByLang = UiTranslate::where('language_id', '!=', $enLang->id)
            ->get()
            ->filter(function($translate) {
                return mb_substr($translate->key, -1, 1) !== '.';
            })
            ->values()
            ->groupBy('language_id');

        $notEnLanguages = Language::where('code', '!=', 'en')->get();

        foreach ($enTranslates as $enTranslate) {
            foreach ($notEnLanguages as $notEnLanguage) {
                $notEnTranslatesByKey = ($notEnTranslatesByLang[$notEnLanguage->id] ?? collect())->groupBy('key');
                if (!isset($notEnTranslatesByKey[$enTranslate->key])) {
                    UiTranslate::create([
                        'language_id' => $notEnLanguage->id,
                        'key' => $enTranslate->key,
                        'value' => $enTranslate->value,
                    ]);

                    $this->line("Lang $notEnLanguage->code - key $enTranslate->key was created");
                }
            }
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

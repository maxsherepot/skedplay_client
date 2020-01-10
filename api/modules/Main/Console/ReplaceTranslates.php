<?php

namespace Modules\Main\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Modules\Main\Entities\Language;
use Modules\Main\Entities\UiTranslate;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class ReplaceTranslates extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'translates:replace';

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
        foreach (Language::all() as $lang) {
            if (!file_exists(storage_path('locales/' . $lang->code . '/translation.json'))) {
                continue;
            }

            $translates = file_get_contents(storage_path('locales/' . $lang->code . '/translation.json'));
            $translates = json_decode($translates, true);

            $translates = Arr::dot($translates);

            foreach ($translates as $key => $translate) {
                if ($translateModel = UiTranslate::whereLanguageId($lang->id)->where('key', $key)->first()) {
                    $translateModel->update([
                        'key' => $key,
                        'value' => $translate,
                    ]);

                    continue;
                }

                UiTranslate::create([
                    'language_id' => $lang->id,
                    'key' => $key,
                    'value' => $translate,
                ]);
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

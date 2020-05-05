<?php

namespace Modules\Main\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Modules\Main\Entities\Language;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class ExportTranslates extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'translates:export';

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
        foreach (Language::with('uiTranslates')->get() as $lang) {
            $translatesFormatted = [];

            foreach ($lang->uiTranslates as $translate) {
                if (!$translate->value) {
                    continue;
                }
                Arr::set($translatesFormatted, $translate->key, $translate->value);
            }

            $translatesJson = json_encode($translatesFormatted, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
            $translatesJson = preg_replace('/^(  +?)\\1(?=[^ ])/m', '$1', $translatesJson);

            Storage::put("export/translates/$lang->code/translation.json", $translatesJson);
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

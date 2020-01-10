<?php

namespace Modules\Main\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Modules\Main\Entities\Language;
use Modules\Main\Entities\UiTranslate;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class RefreshTranslatesOnFront extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'translates:refresh';

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
        file_get_contents(preg_replace('#\:\d{4}$#', '', config('app.url')));
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

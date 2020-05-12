<?php

namespace Modules\Main\Console;

use Illuminate\Console\Command;
use Modules\Main\Entities\Page;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class InitPages extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'pages:init';

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
        $pages = [
            [
                'key' => 'index',
                'title' => 'Skedplay',
                'header' => 'Skedplay',
                'description' => null,
                'keywords' => null,
            ],

            [
                'key' => 'girls',
                'title' => 'Girls',
                'header' => 'Girls',
                'description' => null,
                'keywords' => null,
            ],

            [
                'key' => 'trans',
                'title' => 'Trans',
                'header' => 'Trans',
                'description' => null,
                'keywords' => null,
            ],

            [
                'key' => 'vip-escort',
                'title' => 'Vip escort',
                'header' => 'Vip escort',
                'description' => null,
                'keywords' => null,
            ],

            [
                'key' => 'clubs',
                'title' => 'Clubs',
                'header' => 'Clubs',
                'description' => null,
                'keywords' => null,
            ],

            [
                'key' => 'events',
                'title' => 'Events',
                'header' => 'Events',
                'description' => null,
                'keywords' => null,
            ],

            [
                'key' => 'about',
                'title' => 'About',
                'header' => 'About',
                'description' => null,
                'keywords' => null,
            ],

            [
                'key' => 'help-center',
                'title' => 'Help center',
                'header' => 'Help center',
                'description' => null,
                'keywords' => null,
            ],
        ];

        foreach ($pages as $page) {
            $pageModel = Page::where('key', $page['key'])->first();

            if ($pageModel) {
                continue;
            }

            Page::create($page);
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

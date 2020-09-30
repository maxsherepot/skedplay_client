<?php

namespace Modules\Common\Console;

use Illuminate\Console\Command;
use Modules\Common\Entities\Setting;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class InitSettings extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'settings:init';

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
        $settings = [
            ['key' => 'employee_cards_count', 'label' => 'Employee account cards count', 'value' => 20],
            ['key' => 'employee_active_cards_count', 'label' => 'Employee account active cards count', 'value' => 2],
        ];

        foreach ($settings as $setting) {
            if (Setting::where('key', $setting['key'])->first()) {
                continue;
            }

            $settingEntity = new Setting;
            $settingEntity->key = $setting['key'];
            $settingEntity->label = $setting['label'];
            $settingEntity->value = $setting['value'];

            $settingEntity->save();

            $this->line("{$setting['key']} created");
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

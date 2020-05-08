<?php

namespace Modules\Main\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;
use Modules\Main\Entities\Language;
use Modules\Main\Entities\UiTranslate;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class GenerateEntitiesAddresses extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'addresses:generate';

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
        $addresses = [
            'Hagenholzstrasse 110, Цюрих, Швейцария',
            'Sulgenrain 22, Берн, Швейцария',
            'Брандштрассе 33, Шлирен, Швейцария',
            'Zihlmattweg 44, Люцерн, Швейцария',
            'Rue de l\'Athénée 44, Женева, Швейцария',
            'Aeschenvorstadt 56, Базель, Швейцария',
            'Im oberen Gern 61, Винтертур, Швейцария',
            'Lettenstrasse 78, Кильхберг, Швейцария',
            'Lindauerstrasse 23, Tagelswangen, Швейцария',
            'Hertensteinstrasse 156, Веггис, Швейцария',
        ];

        $entities = [
            Employee::class,
            Club::class,
            Event::class,
        ];

        foreach ($entities as $entity) {
            $models = $entity::with('city.canton')->get();

            foreach ($models as $model) {
                if (!$model->address || !$model->city_id || !$model->city->canton) {
                    $model->address = Arr::random($addresses);
                    $model->save();
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

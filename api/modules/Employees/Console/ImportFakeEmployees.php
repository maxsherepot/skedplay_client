<?php

namespace Modules\Employees\Console;

use Illuminate\Console\Command;
use Illuminate\Http\Testing\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeRaceType;
use Modules\Employees\Repositories\EmployeeRepository;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class ImportFakeEmployees extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'employees:import:fake {--clear=false}';

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

    public function handle(EmployeeRepository $employeeRepository)
    {
        $clear = $this->option('clear') === 'true';

        $girlsFolders = glob(storage_path('girls/*'));

        $races = EmployeeRaceType::all();

//        DB::beginTransaction();

        if ($clear) {
            Employee::with('owner')->get()->map(function(Employee $employee) {
                if ($employee->owner_type === 'user') {
                    return;
                }

                $employee->chats()->forceDelete();
                $employee->delete();

                if ($employee->owner_type === 'user') {
                    $employee->owner->delete();
                }
            });
        }

        $bar = $this->getOutput()->createProgressBar(count($girlsFolders));
        $bar->start();

        foreach ($girlsFolders as $girlFolder) {
            $lastSegment = Arr::last(explode('/', $girlFolder));

            [$name, $age] = explode(',', $lastSegment);
            $name = trim($name);
            $age = (int) trim($age);

            $birthday = now()->subYears($age)->addMonths(mt_rand(1, 3))->subDays(mt_rand(10, 20));

            $employee = new Employee;

            $employee->first_name = $name;
            $employee->birthday = $birthday;
            $employee->age = $age;
            $employee->type = Employee::TYPE_GIRL;
            $employee->race_type_id = $races->random()->id;
            $employee->status = 1;
            $employee->user_status = 1;
            $employee->soon = 1;
            $employee->fake = 1;
            $employee->active = 0;
            $employee->show_level = Employee::SHOW_LEVEL_SOON;

            DB::beginTransaction();

            $employee->save();

            $photos = glob($girlFolder . '/*');

            foreach ($photos as $photo) {
                $employee->addmedia($photo)
                    ->toMediaCollection(Employee::PHOTO_COLLECTION);
            }

            DB::commit();

            $bar->advance();
        }

        $bar->finish();

//        DB::commit();

        $this->call('addresses:generate');


//        dd($girlsFolders);
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

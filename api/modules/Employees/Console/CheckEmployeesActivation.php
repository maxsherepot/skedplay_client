<?php

namespace Modules\Employees\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\Setting;
use Modules\Employees\Entities\Employee;
use Modules\Users\Entities\User;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class CheckEmployeesActivation extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'employees:check:activation';

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
        $maxActiveCount = Setting::where('key', 'employee_active_cards_count')->first()->value ?? 2;

//        if ($user->employees()->where('active', 1)->count() >= $maxActiveCount) {
//            throw new \Exception("employee user can have only $maxActiveCount active cards");
//        }
//
        $owners = [Club::class, User::class];

        foreach ($owners as $owner) {
            /** @var Builder $query */
            $query = $owner::query();

            $query->with([
                'employees' => fn($q) => $q->where('active', 0)->whereNotNull('will_activate_at')
            ]);

            /** @var Club|User $ownerModel */
            $ownerModel = $query->get();

            foreach ($ownerModel->employees as $employee) {
                $employee->soon = $employee->will_activate_at->subDays(Employee::SOON_DAYS) < now() ? 1 : 0;
                $employee->active = $employee->will_activate_at < now() ? 1 : 0;

                if ($employee->active) {
                    $employee->show_level = Employee::SHOW_LEVEL_ACTIVE;
                } elseif ($employee->soon) {
                    $employee->show_level = Employee::SHOW_LEVEL_SOON;
                } else {
                    $employee->show_level = Employee::SHOW_LEVEL_HIDDEN;
                }

                $employee->save();
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

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Modules\Employees\Entities\Employee;

class DeactivationEmployee extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'employee:deactivation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
     * @return int
     */
    public function handle()
    {
       $employees = Employee::whereNotNull('activation_expires_at')->get();

        /** @var Employee $employee */
        foreach ($employees as $employee) {
            if ($employee->activation_expires_at <= now()) {
                $employee->active = 0;
                $employee->activation_expires_at = null;
                $employee->activated_at = null;
                $employee->updateShowLevel();
                $employee->save();
            }
       }
    }
}

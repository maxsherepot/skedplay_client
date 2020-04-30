<?php

namespace App\Console;

use App\Console\Commands\BossCommand;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Modules\Employees\Console\CheckEmployeesActivation;
use Modules\Events\Console\CheckEventsNotification;
use Modules\Main\Console\CheckTranslatesConsistency;
use Modules\Main\Console\RefreshTranslatesOnFront;
use Modules\Main\Console\InsertTranslates;
use Modules\Users\Console\AddAdminMessageToChats;
use Modules\Users\Console\SetDefaultStatus;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        BossCommand::class,
        CheckEmployeesActivation::class,
        InsertTranslates::class,
        RefreshTranslatesOnFront::class,
        CheckTranslatesConsistency::class,
        CheckEventsNotification::class,
        AddAdminMessageToChats::class,
        SetDefaultStatus::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('events:check:notification')
            ->everyMinute();

         $schedule->command('employees:check:activation')
                  ->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

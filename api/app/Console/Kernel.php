<?php

namespace App\Console;

use App\Console\Commands\BossCommand;
use App\Console\Commands\ClearAllCommand;
use App\Console\Commands\DeployCommand;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Modules\Clubs\Console\CreatePossibleClub;
use Modules\Common\Console\InitSettings;
use Modules\Employees\Console\CheckEmployeesActivation;
use Modules\Employees\Console\ImportFakeEmployees;
use Modules\Main\Console\CheckTranslatesConsistency;
use Modules\Main\Console\ExportTranslates;
use Modules\Main\Console\GenerateEntitiesAddresses;
use Modules\Main\Console\InitPages;
use Modules\Main\Console\InitPatterns;
use Modules\Main\Console\InsertTranslates;
use Modules\Main\Console\RefreshTranslatesOnFront;
use Modules\Users\Console\AddAdminMessageToChats;
use Modules\Users\Console\InitUsersCards;
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
        ExportTranslates::class,
        RefreshTranslatesOnFront::class,
        CheckTranslatesConsistency::class,
        AddAdminMessageToChats::class,
        SetDefaultStatus::class,
        GenerateEntitiesAddresses::class,
        InitPages::class,
        CreatePossibleClub::class,
        ImportFakeEmployees::class,
        InitPatterns::class,
        InitUsersCards::class,
        InitSettings::class,
        ClearAllCommand::class,
        DeployCommand::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     *
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('events:check:notification')
            ->everyMinute();

//        $schedule->command('employees:check:activation')
//                  ->daily();
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

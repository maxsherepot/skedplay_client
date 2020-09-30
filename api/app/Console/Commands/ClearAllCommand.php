<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;

class ClearAllCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear:all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'clear all!';

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
        Employee::withTrashed()
            ->where('fake', 0)
            ->chunk(10, function(Collection $employees) {
                 foreach ($employees as $employee) {
                     $employee->chats()->forceDelete();
                     $employee->events()->delete();
                     $employee->delete();
                 }
            });

        Club::withTrashed()
            ->chunk(10, function(Collection $clubs) {
                foreach ($clubs as $club) {
                    $club->forceDelete();
                }
            });

        Event::withTrashed()
            ->chunk(10, function(Collection $events) {
                foreach ($events as $event) {
                    $event->forceDelete();
                }
            });

        User::query()
            ->chunk(10, function(Collection $users) {
                /** @var User $user */
                foreach ($users as $user) {
                    if ($user->hasRole(Role::ADMIN)) {
                        continue;
                    }
                    $user->delete();
                }
            });
    }
}

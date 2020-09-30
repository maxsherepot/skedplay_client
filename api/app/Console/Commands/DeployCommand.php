<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;

class DeployCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '';

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
        $this->call('settings:init');

        $clearAll = $this->confirm('Do clear girls, clubs and users?');

        if ($clearAll) {
            $this->call('clear:all');
        }

        $importClubs = $this->confirm('Do import new clubs?');

        if ($importClubs) {
            $this->call('possible:club:create', ['filename' => 'clubs-new.json']);
        }

        $this->warn("Don't forget to replace nova version to 3!!!");
    }
}

<?php

namespace Modules\Users\Console;

use Illuminate\Console\Command;
use Modules\Users\Entities\User;
use Modules\Users\Entities\UserCard;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class InitUsersCards extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'users:card:init';

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

    public function handle()
    {
        $users = User::query()
            ->whereDoesntHave('card')
            ->get();

        /** @var User $user */
        foreach ($users as $user) {
            if ($user->is_client) {
                $userType = UserCard::USER_TYPE_CLIENT;
            } elseif ($user->is_club_owner) {
                $userType = UserCard::USER_TYPE_CLUB_OWNER;
            } elseif ($user->isEmployee()) {
                $userType = UserCard::USER_TYPE_EMPLOYEE;
            } else {
                continue;
            }

            $user->card()->create([
                'card_type' => 1,
                'user_type' => $userType,
                'code' => mt_rand(1000000, 9999999),
            ]);
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

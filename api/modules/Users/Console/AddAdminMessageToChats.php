<?php

namespace Modules\Users\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Modules\Chat\Entities\Message;
use Modules\Chat\Repositories\ChatRepository;
use Modules\Users\Entities\User;
use Modules\Users\Services\AdminMessagesGenerate;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class AddAdminMessageToChats extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'chats:admin:init';

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

    public function handle(AdminMessagesGenerate $adminMessagesGenerate)
    {
        $adminMessagesGenerate->execute();
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

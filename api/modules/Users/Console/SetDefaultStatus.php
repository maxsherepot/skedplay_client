<?php

namespace Modules\Users\Console;

use Illuminate\Console\Command;
use Modules\Employees\Repositories\EmployeeRepository;
use Modules\Main\Repositories\EventRepository;
use Modules\Users\Entities\User;
use Modules\Users\Repositories\ClubRepository;
use Modules\Users\Repositories\UserRepository;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class SetDefaultStatus extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'user:set:status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set default status for users and their dependencies';

    /** @var UserRepository */
    protected $userRepository;

    /** @var EmployeeRepository */
    protected $employeeRepository;

    /** @var ClubRepository */
    protected $clubRepository;

    /** @var EventRepository */
    protected $eventRepository;

    /**
     * Create a new command instance.
     *
     * @param UserRepository $userRepository
     * @param EmployeeRepository $employeeRepository
     * @param ClubRepository $clubRepository
     * @param EventRepository $eventRepository
     */
    public function __construct(
        UserRepository $userRepository,
        EmployeeRepository $employeeRepository,
        ClubRepository $clubRepository,
        EventRepository $eventRepository
    ){
        parent::__construct();
        $this->userRepository = $userRepository;
        $this->employeeRepository = $employeeRepository;
        $this->clubRepository = $clubRepository;
        $this->eventRepository = $eventRepository;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     * @throws \Exception
     */
    public function handle()
    {
        $status = User::STATUS_CONFIRMED;
        $this->clubRepository->updateAllStatusConfirm();
        $this->eventRepository->updateAllStatusConfirm();

        for($i = 0; $i < 50; $i++) {
            $id = random_int(1, 50);

            $user = $this->userRepository->find($id);

            if ($user) {
                if ($user->getIsEmployeeAttribute()) {
                    $this->userRepository->updateStatusConfirm($user->id);
                    $this->employeeRepository->updateUserStatusByUserId($user->id, $status);

                    $employeeIds = $this->employeeRepository->getEmployeeIdByUserId($user->id);

                    foreach ($employeeIds as $employee) {
                        $this->eventRepository->updateUserStatusByOwnerId($employee->id, $status, 'employee');
                    }

                    $this->eventRepository->updateUserStatusByOwnerId($user->id, $status, 'user');
                }

                if ($user->getIsClubOwnerAttribute()) {
                    $this->userRepository->updateStatusConfirm($user->id);
                    $this->clubRepository->updateUserStatusByUserId($user->id, $status);

                    $clubsId = $this->clubRepository->getClubsIdByUserId($user->id);

                    foreach ($clubsId as $club) {
                        $this->employeeRepository->updateUserStatusByClubId($club->id, $status);
                        $this->eventRepository->updateUserStatusByClubId($club->id, $status);
                    }
                }
            }

        }

        $this->alert('Statuses are set');
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
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
        ];
    }
}

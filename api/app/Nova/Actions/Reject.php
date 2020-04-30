<?php

namespace App\Nova\Actions;

use Illuminate\Bus\Queueable;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Laravel\Nova\Actions\DestructiveAction;
use Illuminate\Contracts\Queue\ShouldQueue;
use Laravel\Nova\Fields\Textarea;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Repositories\EmployeeRepository;
use Modules\Main\Repositories\EventRepository;
use Modules\Users\Entities\User;
use Modules\Users\Repositories\ClubRepository;
use Modules\Users\Repositories\UserRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Reject extends Action
{
//    use InteractsWithQueue, Queueable, SerializesModels;

//    public $runCallback = true;

    public function authorizedToRun(Request $request, $model)
    {
        return true;
    }

    /**
     * Perform the action on the given models.
     *
     * @param  \Laravel\Nova\Fields\ActionFields  $fields
     * @param  \Illuminate\Support\Collection  $models
     * @return mixed
     */
    public function handle(ActionFields $fields, Collection $models)
    {
        /** @var UserRepository $userRepository */
        $userRepository = new UserRepository();

        /** @var ClubRepository $clubRepository */
        $clubRepository = new ClubRepository();

        /** @var EmployeeRepository $employeeRepository */
        $employeeRepository = new EmployeeRepository();

        /** @var EventRepository $eventRepository */
        $eventRepository = new EventRepository();

        $status = User::STATUS_REFUSED;

        foreach ($models as $model) {
            if ($model->collection_name === 'verify-photo') {
                $user = $userRepository->find($model->model_id);

                if ($user === null) {
                    throw new NotFoundHttpException();
                }

                $reason = $fields->get('rejected_reason');
                $userRepository->updateStatusReject($user->id, $reason);

                if ($user->getIsClubOwnerAttribute()) {
                    $clubRepository->updateUserStatusByUserId($user->id, $status);

                    $clubsId = $clubRepository->getClubsIdByUserId($user->id);

                    foreach ($clubsId as $club) {
                        $employeeRepository->updateUserStatusByClubId($club->id, $status);

                        $eventRepository->updateUserStatusByClubId($club->id, $status);
                    }
                }

                if ($user->getIsEmployeeAttribute()) {
                    $employeeRepository->updateUserStatusByUserId($user->id, $status);

                    $employeeIds = $employeeRepository->getEmployeeIdByUserId($user->id);

                    foreach ($employeeIds as $employee) {
                        $eventRepository->updateUserStatusByOwnerId($employee->id, $status, 'employee');
                    }

                    $eventRepository->updateUserStatusByOwnerId($user->id, $status, 'user');
                }
            }

            $model->status = $status;
            $model->rejected_reason = $fields->get('rejected_reason');
            $model->save();
        }

        return Action::message('Rejected');
    }

    /**
     * Get the fields available on the action.
     *
     * @return array
     */
    public function fields()
    {
        return [
            Textarea::make('Reason', 'rejected_reason')->rules('required', 'max:255'),
        ];
    }
}

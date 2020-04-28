<?php

namespace App\Nova\Actions;

use Illuminate\Http\Request;
use Laravel\Nova\Actions\Action;
use Illuminate\Support\Collection;
use Laravel\Nova\Fields\ActionFields;
use Modules\Employees\Repositories\EmployeeRepository;
use Modules\Main\Repositories\EventRepository;
use Modules\Users\Entities\User;
use Modules\Users\Repositories\ClubRepository;
use Modules\Users\Repositories\UserRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Confirm extends Action
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

        $status = User::STATUS_CONFIRMED;

        foreach ($models as $model) {
            if ($model->collection_name === 'verify-photo') {
                $user = $userRepository->find($model->model_id);

                if ($user === null) {
                    throw new NotFoundHttpException();
                }

                $userRepository->updateStatusConfirm($user->id);

                if ($user->getIsClubOwnerAttribute()) {
                    $clubRepository->updateUserStatusByUserId($user->id, $status);

                    $clubsId = $clubRepository->getClubsIdByUserId($user->id);

                    foreach ($clubsId as $club) {
                        $employeeRepository->updateUserStatusByClubId($club->id, $status);

                        $eventRepository->updateUserStatusByClubId($club->id, $status);
                    }
                }

                if ($user->getIsEmployeeAttribute()) {
                    $eventRepository->updateUserStatusByEmployeeId($user->id, $status);
                }
            }

            $model->status = $status;
            $model->rejected_reason = null;
            $model->save();
        }
        return Action::message('Confirmed');
    }

    /**
     * Get the fields available on the action.
     *
     * @return array
     */
    public function fields()
    {
        return [];
    }
}

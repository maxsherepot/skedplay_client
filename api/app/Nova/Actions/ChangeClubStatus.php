<?php

namespace App\Nova\Actions;

use Epartment\NovaDependencyContainer\NovaDependencyContainer;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Fields\Select;

class ChangeClubStatus extends Action
{
//    use InteractsWithQueue, Queueable, SerializesModels;

//    public $runCallback = true;

    public function authorizedToRun(Request $request, $model)
    {
        return true;
    }

    public function handle(ActionFields $fields, Collection $models)
    {
        foreach ($models as $model) {
            $model->status = $fields->status;
            $model->user_status = $fields->user_status;
            $model->manager_status = $fields->manager_status;

            $model->save();
        }

        return Action::message('Status updated');
    }

    public function fields()
    {
        return [
            NovaDependencyContainer::make([
                Select::make('Club status', 'status')->options([
                    \Modules\Users\Entities\User::STATUS_AWAITING_CONFIRMATION => 'Awaiting',
                    \Modules\Users\Entities\User::STATUS_CONFIRMED             => 'Confirmed',
                ])->required(),

                Select::make('User status', 'user_status')->options([
                    \Modules\Users\Entities\User::STATUS_AWAITING_CONFIRMATION => 'Awaiting',
                    \Modules\Users\Entities\User::STATUS_CONFIRMED             => 'Confirmed',
                ])->required(),
            ])->dependsOnNotEmpty('user_id'),

            Select::make('Manager status', 'manager_status')->options([
                \Modules\Clubs\Entities\Club::STATUS_PENDING    => 'Pending',
                \Modules\Clubs\Entities\Club::STATUS_CONNECTED  => 'Connected',
                \Modules\Clubs\Entities\Club::STATUS_REFUSED    => 'Refused',
                \Modules\Clubs\Entities\Club::STATUS_PROCESSING => 'Processing',
            ])->displayUsingLabels()->required(),
        ];
    }
}

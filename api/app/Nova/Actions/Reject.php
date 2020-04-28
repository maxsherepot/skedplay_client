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
use Modules\Users\Entities\User;

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
        foreach ($models as $model) {
            if ($model->collection_name === 'verify-photo') {
                DB::table('users')
                    ->where('id', '=', $model->model_id)
                    ->update([
                            'status' => 2,
                            'rejected_reason' => $fields->get('rejected_reason')
                    ])
                ;
            }

            $model->status = User::STATUS_REFUSED;
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

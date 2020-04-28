<?php

namespace App\Nova\Actions;

use Illuminate\Bus\Queueable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Nova\Actions\Action;
use Illuminate\Support\Collection;
use Laravel\Nova\Fields\ActionFields;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Users\Entities\User;

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
        foreach ($models as $model) {
            if ($model->collection_name === 'verify-photo') {
                DB::table('users')
                    ->where('id', '=', $model->model_id)
                    ->update([
                        'status' => 1,
                        'rejected_reason' => null,
                    ])
                ;
            }

            $model->status = User::STATUS_CONFIRMED;
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

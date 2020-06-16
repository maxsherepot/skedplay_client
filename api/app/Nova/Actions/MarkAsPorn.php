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
use Spatie\MediaLibrary\Models\Media;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MarkAsPorn extends Action
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
        /** @var Media $model */
        foreach ($models as $model) {
            $model->setCustomProperty('porn', true);
            $model->save();
        }

        return Action::message('Saved');
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

<?php

namespace App\Nova\Actions;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Fields\Text;

class Comment extends Action
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
            $model->comment = $fields->comment;

            $model->save();
        }

        return Action::message('Status updated');
    }

    public function fields()
    {
        return [
            Text::make('Comment'),
        ];
    }
}

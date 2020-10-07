<?php

namespace App\Nova;

use App\Nova\Fields\Translatable;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Advoor\NovaEditorJs\NovaEditorJs;

class Page extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'Modules\Main\Entities\Page';

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'key';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id', 'key', 'title',
    ];

    /**
     * @param Request $request
     *
     * @return bool
     */
    public static function availableForNavigation(Request $request): bool
    {
        return $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_ADMIN);
    }

    /**
     * Get the fields displayed by the resource.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function fields(Request $request)
    {

        $fields = [
            Text::make('Key')
                ->sortable()
                ->hideWhenUpdating()
                ->hideWhenCreating(),

            Text::make('Title')
                ->rules('required', 'max:255'),

            Text::make('Header')
                ->rules('required', 'max:255'),

            Text::make('Description')
                ->rules('max:600'),

            Text::make('Keywords')
                ->rules('max:255'),

        ];

        if ($this->key === 'help-center') {
            $fields[] = NovaEditorJs::make('Content')
                ->rules('required')
                ->hideFromIndex();
        }

        return [
            ID::make()->sortable(),

            Translatable::make($fields)->locales(\Modules\Main\Entities\Language::all()->pluck('code')->toArray()),
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function cards(Request $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function filters(Request $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function lenses(Request $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function actions(Request $request)
    {
        return [];
    }
}

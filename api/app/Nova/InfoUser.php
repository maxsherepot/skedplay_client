<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;

class InfoUser extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'Modules\Users\Entities\InfoUser';

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'ip';

    public static $group = 'Users & Freier';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id', 'ip', 'user_agent',
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
        return [
            ID::make()->sortable(),
            BelongsTo::make('user'),
            Text::make('Locale')->sortable(),
            Text::make('IP')->sortable(),
            Text::make('Browser')->sortable(),
            Text::make('Operating System')->sortable(),
            DateTime::make('Created At')->onlyOnDetail(),
            DateTime::make('Updated At')->sortable(),
            Text::make('User Agent')->onlyOnDetail(),
            Text::make('Browser Locale')->onlyOnDetail(),
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

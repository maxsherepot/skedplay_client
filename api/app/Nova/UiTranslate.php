<?php

namespace App\Nova;

use App\Nova\Filters\UiTranslateLangFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;

class UiTranslate extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'Modules\Main\Entities\UiTranslate';

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'key';

    /**
     * The logical group associated with the resource.
     *
     * @var string
     */
    public static $group = 'Languages & Content';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id', 'key', 'value',
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

            BelongsTo::make('Language')->onlyOnIndex(),

            Text::make('Language', 'language.name')
                ->sortable()
                ->withMeta(['extraAttributes' => [
                    'readonly' => true,
                    'disabled' => true,
                ]])
                ->onlyOnForms(),

            Text::make('Key')
                ->sortable()
                ->withMeta(['extraAttributes' => [
                    'readonly' => true,
                    'disabled' => true,
                ]]),

            Text::make('Value')
                ->sortable()
                ->rules('required', 'max:3000')
                ->displayUsing(function ($title) {
                    return Str::limit($title, 30, '...');
                }),
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
        return [
            new UiTranslateLangFilter(),
        ];
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

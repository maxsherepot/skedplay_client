<?php

namespace App\Nova;

use App\Nova\Filters\UserRoleFilter;
use Eminiarts\Tabs\Tabs;
use Laravel\Nova\Fields\BelongsToMany;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Skidplay\UserTopInfo\UserTopInfo;

class User extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'Modules\Users\Entities\User';

    public static $with = [
        'roles'
    ];

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'name';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id', 'name', 'email',
    ];

//    public static function indexQuery(NovaRequest $request, $query)
//    {
//        return $query->whereDoesntHave('roles', function($query) {
//            $query->whereNotIn('name', ['admin', 'moderator']);
//        });
//    }

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function fields(Request $request)
    {
        $userId = $request->route('resourceId');

        if (!$userId) {
            return $this->getTableFields();
        }

        $user = \Modules\Users\Entities\User::find($request->route('resourceId'));

        if ($user->hasRole('client')) {
            return $this->getClientTabs();
        }

        if ($user->hasRole('employee')) {
            new Tabs('Tabs', [
                'About' => $this->getAboutTabFields(),
                'Other Info' => [
                    DateTime::make('Registration date', 'created_at')->format('YYYY/MM/DD'),

                    Text::make('In system status', 'nova_status')
                        ->hideWhenCreating()
                        ->hideWhenUpdating(),
                ],
            ]),
        }

        return [
            new Tabs('Tabs', [
                'About' => $this->getAboutTabFields(),
                'Other Info' => [
                    DateTime::make('Registration date', 'created_at')->format('YYYY/MM/DD'),

                    Text::make('In system status', 'nova_status')
                        ->hideWhenCreating()
                        ->hideWhenUpdating(),
                ],
            ]),
        ];
    }

    private function getTableFields(): array
    {
        return [
            Text::make('Name')
                ->sortable(),

            Text::make('Type')
                ->hideWhenCreating()
                ->hideWhenUpdating()
                ->displayUsing(function($role) {
                    return $role->display_name;
                }),

            DateTime::make('Registration date', 'created_at')->format('YYYY/MM/DD'),

            Text::make('In system status', 'nova_status')
                ->hideWhenCreating()
                ->hideWhenUpdating(),
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function cards(Request $request)
    {
        return [
            (new UserTopInfo())->onlyOnDetail(),
        ];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [
            new UserRoleFilter(),
        ];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function lenses(Request $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [];
    }

    private function getAboutTabFields(): array
    {
        return [
            Text::make('Name')
                ->sortable()
                ->rules('required', 'max:255'),

            Text::make('Type')
                ->hideWhenCreating()
                ->hideWhenUpdating()
                ->displayUsing(function ($role) {
                    return $role->display_name;
                }),

            Text::make('Phone')
                ->hideFromIndex(),

            Text::make('Email')
                ->hideFromIndex(),

            DateTime::make('Birthday')
                ->format('DD.MM.YYYY')
                ->hideFromIndex(),

            Text::make('Age')
                ->hideFromIndex(),
        ];
    }

    private function getClientTabs(): array
    {
        return [
            new Tabs('Tabs', [
                'About' => $this->getAboutTabFields(),
            ]),
        ];
    }
}

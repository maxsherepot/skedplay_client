<?php

namespace App\Nova;

use App\Nova\Filters\UserRoleFilter;
use Eminiarts\Tabs\Tabs;
use Laravel\Nova\Fields\DateTime;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\KeyValue;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Panel;
use Skidplay\UserTopInfo\UserTopInfo;

class Club extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'Modules\Clubs\Entities\Club';

    public static $with = [
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
        'id', 'name',
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

        return $this->getClubOwnerTabs();
    }

    private function getTableFields(): array
    {
        return [
            Text::make('Name')
                ->sortable(),

//            Text::make('Type')
//                ->hideWhenCreating()
//                ->hideWhenUpdating()
//                ->displayUsing(function($role) {
//                    return $role->display_name;
//                }),
//
//            DateTime::make('Registration date', 'created_at')->format('YYYY/MM/DD'),
//
//            Text::make('In system status', 'nova_status')
//                ->hideWhenCreating()
//                ->hideWhenUpdating(),
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
//            (new UserTopInfo())->onlyOnDetail(),
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
//            new UserRoleFilter(),
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
        return [

        ];
    }

    private function getAboutTabFields(): array
    {
        return [
            Text::make('Name'),

//            Text::make('Type')
//                ->displayUsing(function ($role) {
//                    return $role->display_name;
//                }),
//
//            Text::make('Phone'),
//
//            Text::make('Email'),
//
//            DateTime::make('Birthday')
//                ->format('DD.MM.YYYY'),
//
//            Text::make('Age'),
        ];
    }

    private function getClubOwnerTabs(): array
    {
        return [
            new Tabs('Tabs', [
                'About' => $this->getAboutTabFields(),
//                'Other Info' => [
//                    DateTime::make('Registration date', 'created_at')->format('YYYY/MM/DD'),
//
//                    Text::make('In system status', 'nova_status')
//                        ->hideWhenCreating()
//                        ->hideWhenUpdating(),
//                ],
            ]),
        ];
    }
}

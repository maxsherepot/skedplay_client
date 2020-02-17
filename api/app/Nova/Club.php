<?php

namespace App\Nova;

use App\Nova\Filters\ClubTypeFilter;
use App\Nova\Filters\ModerationStatusFilter;
use App\Nova\Filters\UserRoleFilter;
use Eminiarts\Tabs\Tabs;
use Illuminate\Support\Str;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\DateTime;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\KeyValue;
use Laravel\Nova\Fields\MorphMany;
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
        $clubId = $request->route('resourceId');

        if (!$clubId) {
            return $this->getTableFields();
        }

        return $this->getViewFields();
    }

    private function getTableFields(): array
    {
        return [
            ID::make()->sortable(),

            Text::make('Name')
                ->sortable(),

            BelongsTo::make('Type', 'type', ClubType::class)->sortable(),

            BelongsTo::make('Owner', 'owner', User::class)->sortable(),


            Text::make('Status', function() {
                return view(
                    'nova.moderation_status',
                    ['status' => $this->status ?? 0]
                )->render();
            })->asHtml(),

            Text::make('In system', 'created_at_diff'),
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
            new ClubTypeFilter(),
            new ModerationStatusFilter(),
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
            BelongsTo::make('Type', 'type', ClubType::class)->sortable(),
            BelongsTo::make('Owner', 'owner', User::class)->sortable(),

            Text::make('Name'),
            Text::make('Description'),
            Text::make('Address'),

            Text::make('Email'),
            Text::make('Website'),
            Text::make('Phones', function() {
                return implode('<br>', json_decode($this->phones, true));
            })->asHtml(),

            Text::make('Status', function() {
                return view(
                    'nova.moderation_status',
                    ['status' => $this->status ?? 0]
                )->render();
            })->asHtml(),

            Text::make('Refuse reason', 'rejected_reason'),
        ];
    }

    private function getViewFields(): array
    {
        return [
            new Tabs('Tabs', [
                'About' => $this->getAboutTabFields(),
                HasMany::make('Photos'),
                HasMany::make('Videos'),
                MorphMany::make('Events'),
                MorphMany::make('Employees'),
            ]),
        ];
    }
}

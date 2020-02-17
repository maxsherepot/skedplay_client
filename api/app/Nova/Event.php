<?php

namespace App\Nova;

use App\Nova\Actions\Confirm;
use App\Nova\Actions\Reject;
use Eminiarts\Tabs\Tabs;
use Illuminate\Support\Str;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\MorphTo;
use Laravel\Nova\Fields\MorphToMany;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Gravatar;
use Laravel\Nova\Fields\Password;
use Laravel\Nova\Panel;

class Event extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'Modules\Events\Entities\Event';

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
        'id', 'title'
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function fields(Request $request)
    {
        $eventId = $request->route('resourceId');

        if (!$eventId) {
            return [
                ID::make()->sortable(),

                Text::make('Title')
                    ->displayUsing(function($title) {
                        return Str::limit($title, 30, '...');
                    }),

                BelongsTo::make('Type', 'type', EventType::class)->sortable(),

                MorphTo::make('Owner')->sortable(),

                Text::make('Status', function() {
                    return view(
                        'nova.moderation_status',
                        ['status' => \Modules\Users\Entities\User::STATUSES[$this->status ?? 0]]
                    );
                })->asHtml(),

                Text::make('Refuse reason', 'rejected_reason'),
            ];
        }

        return [
            new Tabs('Tabs', [
                new Panel('About', [
                    ID::make(),

                    Text::make('Title'),

                    Text::make('Description'),

                    BelongsTo::make('Type', 'type', EventType::class)->sortable(),

                    MorphTo::make('Owner')->sortable(),

                    Text::make('Status', function() {
                        return view(
                            'nova.moderation_status',
                            ['status' => $this->status ?? 0]
                        )->render();
                    })->asHtml(),

                    Text::make('Refuse reason', 'rejected_reason'),
                ]),
                HasMany::make('Photos'),
                HasMany::make('Videos'),
            ])
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
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [];
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
            (new Confirm())->canRun(function($request) {
                return true;
            }),
            (new Reject())->canRun(function($request) {
                return true;
            }),
        ];
    }
}

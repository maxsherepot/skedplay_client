<?php

namespace App\Nova;

use App\Nova\Actions\Confirm;
use App\Nova\Actions\Reject;
use App\Nova\Filters\EmployeeTypeFilter;
use App\Nova\Filters\ModerationStatusFilter;
use Eminiarts\Tabs\Tabs;
use Laravel\Nova\Fields\Date;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\KeyValue;
use Laravel\Nova\Fields\MorphMany;
use Laravel\Nova\Fields\MorphTo;
use Laravel\Nova\Fields\MorphToMany;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Panel;
use Skidplay\UserTopInfo\UserTopInfo;

class Employee extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'Modules\Employees\Entities\Employee';

    public static $with = [
    ];

    /**
     * @param Request $request
     * @return bool
     */
    public static function availableForNavigation(Request $request): bool
    {
        return $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_ADMIN) ||
            $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_MODERATOR) ||
            $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_CLUB_OWNER);
    }

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
        'id', 'first_name', 'last_name',
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

        return $this->getEmployeeTabs();
    }

    private function getTableFields(): array
    {
        return [
            Text::make('Name')
                ->sortable(),
            Text::make('User type', 'readable_type'),
            Text::make('Age', 'age'),
            MorphTo::make('Owner'),
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
            new EmployeeTypeFilter(),
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
            (new Confirm())->canRun(function($request) {
                return true;
            }),
            (new Reject())->canRun(function($request) {
                return true;
            }),
        ];
    }

    private function getAboutTabFields(): array
    {
        return [
            //MorphTo::make('Owner'),
            //Text::make('Name'),
            Text::make('First name', 'first_name'),
            Text::make('Last name', 'last_name'),
            Text::make('Status', function() {
                return view(
                    'nova.moderation_status',
                    ['status' => $this->status ?? 0]
                )->render();
            })->asHtml(),
            Date::make('Birthday')
                ->format('DD.MM.YYYY'),
            Text::make('Age'),
            //Text::make('User type', 'readable_type'),
            //Text::make('Race type', 'race_type.name'),
            Text::make('Address', 'address'),
            Text::make('Description', 'description'),
            Text::make('Email', 'email'),
            Text::make('Phone', 'phone'),
            Text::make('Website', 'website'),
            Select::make('Is Vip', 'isVip')->options([
                1 => 'Make Vip',
                0 => 'Cancel Vip',
            ])->onlyOnForms(),
//           KeyValue::make('Prices', 'prices_list')
//               ->keyLabel('Time')
//                ->valueLabel('Price'),
        ];
    }

    private function getEmployeeTabs(): array
    {
        return [
            new Tabs('Tabs', [
                new Panel('About', $this->getAboutTabFields()),
                MorphToMany::make('Services')
                    ->fields(function() {
                        return [
                            Text::make('Price', 'price')->displayUsing(function($price) {
                                return $price . '$';
                            }),
                        ];
                    }),
                HasMany::make('Photos'),
                HasMany::make('Videos'),
                MorphMany::make('Events'),
                MorphMany::make('Actions', 'eventCounts', EventCount::class),
            ])
        ];
    }
}

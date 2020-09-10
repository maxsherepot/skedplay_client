<?php

namespace App\Nova;

use App\Nova\Actions\Confirm;
use App\Nova\Actions\Reject;
use App\Nova\Filters\ClubTypeFilter;
use App\Nova\Filters\ModerationStatusFilter;
use Eminiarts\Tabs\Tabs;
use Epartment\NovaDependencyContainer\HasDependencies;
use Epartment\NovaDependencyContainer\NovaDependencyContainer;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\MorphMany;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Club extends Resource
{
    use HasDependencies;

    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'Modules\Clubs\Entities\Club';

    public static $with = [
    ];

//    /**
//     * @param Request $request
//     * @return bool
//     */
//    public static function availableForNavigation(Request $request): bool
//    {
//        return ($request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_ADMIN) ||
//            $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_MODERATOR) ||
//            $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_CLUB_OWNER)||
//            $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_MANAGER))
//        ;
//    }

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
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function fields(Request $request)
    {
        $clubId = $request->route('resourceId');

        if (!$clubId) {
            return $this->getTableFields();
        }

        if ($request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_ADMIN) ||
            $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_MODERATOR)) {
            return $this->getAdminTabs();
        }

        if ($request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_MANAGER)) {
            return $this->getManagerTabs();
        }

        return $this->getViewFields();
    }

    private function getUserByRoleName(string $roleName): array
    {
        return \Modules\Users\Entities\User::query()
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', '=', $roleName)
            ->pluck('users.name', 'users.id')
            ->toArray();
    }

    private function getAdminTabFields(): array
    {
        return [
            BelongsTo::make('Manager', 'manager', User::class)->sortable()->nullable()->exceptOnForms(),

            Select::make('Manager', 'manager_id')->options($this->getUserByRoleName('manager'))->onlyOnForms(),
            DateTime::make('Set manager date', 'manager_assignment_at')->onlyOnDetail(),
        ];
    }

    private function getManagerTabFields(): array
    {
        return [
            ID::make()->sortable(),

            Text::make('Name'),

            BelongsTo::make('Type', 'type', ClubType::class)->sortable(),
            BelongsTo::make('Owner', 'owner', User::class)->exceptOnForms()->nullable()->sortable(),

            Select::make('Owner', 'user_id')->options($this->getUserByRoleName('club_owner'))->onlyOnForms()->nullable(),

            Text::make('Description'),
            Text::make('Address'),

            Text::make('Email'),
            Text::make('Website'),

            Text::make('Club status', 'status', function () {
                return view(
                    'nova.moderation_status',
                    ['status' => $this->status ?? 0]
                )->render();
            })->asHtml()->exceptOnForms(),

            Text::make('User status', function () {
                return view(
                    'nova.moderation_status',
                    ['status' => $this->user_status ?? 0]
                )->render();
            })->asHtml(),

            Text::make('Manager status', 'manager_status', function () {
                return view(
                    'nova.manager_status',
                    ['status' => $this->manager_status ?? 0]
                )->render();
            })->asHtml()->exceptOnForms(),

            NovaDependencyContainer::make([
                Select::make('Club status', 'status')->options([
                    \Modules\Users\Entities\User::STATUS_AWAITING_CONFIRMATION => 'Awaiting',
                    \Modules\Users\Entities\User::STATUS_CONFIRMED             => 'Confirmed',
                ])->onlyOnForms(),

                Select::make('User status', 'user_status')->options([
                    \Modules\Users\Entities\User::STATUS_AWAITING_CONFIRMATION => 'Awaiting',
                    \Modules\Users\Entities\User::STATUS_CONFIRMED             => 'Confirmed',
                ])->onlyOnForms(),
            ])->dependsOnNotEmpty('user_id')->onlyOnForms(),

            Select::make('Manager status', 'manager_status')->options([
                \Modules\Clubs\Entities\Club::STATUS_PENDING    => 'Pending',
                \Modules\Clubs\Entities\Club::STATUS_CONNECTED  => 'Connected',
                \Modules\Clubs\Entities\Club::STATUS_REFUSED    => 'Refused',
                \Modules\Clubs\Entities\Club::STATUS_PROCESSING => 'Processing',
            ])->displayUsingLabels()->onlyOnForms(),

            DateTime::make('Manager set at', 'manager_assignment_at')->onlyOnDetail(),

            Text::make('Phones')->withMeta([
                'extraAttributes' => [
                    'placeholder' => '+4171-111-11-11',
                ],
            ])->rules('required'),

            Text::make('Comment'),

            DateTime::make('Date of comment', 'comment_set_at')->onlyOnDetail(),
        ];
    }

    private function getTableFields(): array // info main tables
    {
        return [
            ID::make()->sortable(),

            Text::make('Name')->sortable(),

            BelongsTo::make('Type', 'type', ClubType::class)->sortable(),

            Text::make('Address')->hideFromIndex(),
            Text::make('Phone', 'phones')->withMeta([
                'extraAttributes' => [
                    'placeholder' => '+4171-111-11-11',
                ],
            ]),

            Text::make('Email')->onlyOnForms(),
            Text::make('Website')->onlyOnForms(),

            Text::make('Description')->onlyOnForms(),

            BelongsTo::make('Manager', 'manager', User::class)
                ->sortable()
                ->hideWhenCreating(),

            BelongsTo::make('Owner', 'owner', User::class)->exceptOnForms()->nullable()->sortable(),

            Select::make('Owner', 'user_id')->options($this->getUserByRoleName('club_owner'))->onlyOnForms()->nullable(),

            Text::make('Club status', function () {
                return view(
                    'nova.moderation_status',
                    ['status' => $this->status ?? 0]
                )->render();
            })->asHtml(),

            Text::make('Manager status', 'manager_status', function () {
                return view(
                    'nova.manager_status',
                    ['status' => $this->manager_status ?? 0]
                )->render();
            })->asHtml()->exceptOnForms(),

            Select::make('Manager status', 'manager_status')->options([
                \Modules\Clubs\Entities\Club::STATUS_PENDING    => 'Pending',
                \Modules\Clubs\Entities\Club::STATUS_CONNECTED  => 'Connected',
                \Modules\Clubs\Entities\Club::STATUS_REFUSED    => 'Refused',
                \Modules\Clubs\Entities\Club::STATUS_PROCESSING => 'Processing',
            ])->displayUsingLabels()->onlyOnForms(),

            NovaDependencyContainer::make([
                Select::make('Club status', 'status')->options([
                    \Modules\Users\Entities\User::STATUS_AWAITING_CONFIRMATION => 'Awaiting',
                    \Modules\Users\Entities\User::STATUS_CONFIRMED             => 'Confirmed',
                ])->onlyOnForms(),

                Select::make('User status', 'user_status')->options([
                    \Modules\Users\Entities\User::STATUS_AWAITING_CONFIRMATION => 'Awaiting',
                    \Modules\Users\Entities\User::STATUS_CONFIRMED             => 'Confirmed',
                ])->onlyOnForms(),
            ])->dependsOnNotEmpty('user_id'),

            Text::make('Comment')->hideFromIndex(),
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
        return [

        ];
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
            new ClubTypeFilter(),
            new ModerationStatusFilter(),
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
        return [
            (new Confirm())->canRun(function ($request) {
                return true;
            }),
            (new Reject())->canRun(function ($request) {
                return true;
            }),
        ];
    }

    public static function indexQuery(NovaRequest $request, $query)
    {
        if ($request->user()->hasRole('manager')) {
            $query
                ->where('manager_id', '=', $request->user()->id)
                ->orWhere([
                    ['manager_status', '=', \Modules\Clubs\Entities\Club::STATUS_PENDING],
                    ['manager_id', '=', null],
                ]);
        }

        return $query;
    }

    private function getAboutTabFields(): array //main info
    {
        return [
            BelongsTo::make('Type', 'type', ClubType::class)->sortable(),
            BelongsTo::make('Owner', 'owner', User::class)->sortable(),

            Text::make('Name'),
            Text::make('Description'),
            Text::make('Address'),

            Text::make('Email'),
            Text::make('Website'),
            Text::make('Phones', function () {
                return json_decode($this->phones, true);
            })->asHtml(),

            Text::make('Club status', function () {
                return view(
                    'nova.moderation_status',
                    ['status' => $this->status ?? 0]
                )->render();
            })->asHtml(),

            Text::make('Manager status', 'manager_status', function () {
                return view(
                    'nova.manager_status',
                    ['manager_status' => $this->manager_status ?? 0]
                )->render();
            })->asHtml(),

            Text::make('Refuse reason', 'rejected_reason'),

            Text::make('Comment'),
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

    private function getAdminTabs(): array
    {
        return [
            new Tabs('Tabs', [
                'About'   => $this->getManagerTabFields(),
                'Manager' => $this->getAdminTabFields(),
                HasMany::make('Photos'),
                HasMany::make('Videos'),
                MorphMany::make('Events'),
                MorphMany::make('Employees'),
                MorphMany::make('Actions', 'eventCounts', EventCount::class),
            ]),
        ];
    }

    private function getManagerTabs(): array
    {
        return [
            new Tabs('Tabs', [
                'About' => $this->getManagerTabFields(),
                HasMany::make('Photos'),
                HasMany::make('Videos'),
                MorphMany::make('Events'),
                MorphMany::make('Employees'),
            ]),
        ];
    }
}

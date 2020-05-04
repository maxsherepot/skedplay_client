<?php

namespace App\Nova;

use App\Nova\Filters\ModerationStatusFilter;
use App\Nova\Filters\UserRoleFilter;
use Carbon\Carbon;
use Eminiarts\Tabs\Tabs;
use Laravel\Nova\Fields\BelongsToMany;
use Laravel\Nova\Fields\Date;
use Laravel\Nova\Fields\DateTime;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\HasOne;
use Laravel\Nova\Fields\MorphMany;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Password;
use Laravel\Nova\Fields\PasswordConfirmation;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Panel;
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
        'roles',
    ];

    /**
     * @param Request $request
     * @return bool
     */
    public static function availableForNavigation(Request $request): bool
    {
        return $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_ADMIN) ||
            $request->user()->hasRole(\Modules\Users\Entities\User::ACCOUNT_MODERATOR);
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
        'id', 'name', 'email', 'phone',
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
            return $this->getAdminTabs();
        }

        $user = \Modules\Users\Entities\User::query()->find($request->route('resourceId'));

        if ($request->user()->hasRole('client')) {
            return $this->getClientTabs();
        }

        if ($request->user()->hasRole('employee')) {
            return $this->getEmployeeTabs();
        }

        if ($request->user()->hasRole('admin')) {
            return $this->getAdminTabs();
        }

        if ($request->user()->hasRole('club_owner')) {
            return $this->getClubOwnerTabs();
        }

        return $this->getClubOwnerTabs();
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

            Text::make('Status', function() {
                $status = $this->status ?? 0;
                $time = $status === \Modules\Users\Entities\User::STATUS_CONFIRMED
                    ? $this->getCreatedAtDiff()
                    : null;

                return view(
                    'nova.moderation_status',
                    ['status' => $this->status ?? 0, 'time' => $time]
                )->render();
            })->asHtml(),
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
            Text::make('Name'),

            Text::make('Type')
                ->displayUsing(function ($role) {
                    return $role->display_name;
                }),

            Text::make('Phone'),

            Text::make('Email'),

            DateTime::make('Birthday')
                ->format('DD.MM.YYYY'),

            Text::make('Age'),
        ];
    }

    private function getManagerTabFields(): array
    {

        return [
            Text::make('Name'),

            BelongsToMany::make('Roles')
                ->fields(function () {
                    return [
                        Text::make('user_type')
                            ->hideWhenCreating(),
                    ];
                }
            )->displayUsing(function () {
                return $this->pivot->role;
                }),

            Text::make('Type')
                ->onlyOnIndex()
                ->displayUsing(function($role) {
                    return $role->display_name;
                }),

            Text::make('Phone')->withMeta([
                'extraAttributes' => [
                    'placeholder' => '+4171-111-11-11',
                ],
            ])->hideFromIndex(),

            Text::make('Email'),

            Select::make('Gender')->options([
                \Modules\Users\Entities\User::GENDER_MALE => 'Male',
                \Modules\Users\Entities\User::GENDER_FEMALE => 'Female',
            ])->onlyOnForms(),

            Date::make('Birthday')
                ->hideFromIndex(),

            Number::make('Age')
                ->hideWhenCreating()
                ->hideWhenUpdating()
                ->onlyOnDetail()
                ->displayUsing(function () {
                   return $this->age = Carbon::parse($this->birthday)->age;
            }),

            Text::make('Status', function() {
                $status = $this->status ?? 0;
                $time = $status === \Modules\Users\Entities\User::STATUS_CONFIRMED
                    ? $this->getCreatedAtDiff()
                    : null;

                return view(
                    'nova.moderation_status',
                    ['status' => $this->status ?? 0, 'time' => $time]
                )->render();
            })->asHtml(),

            Password::make('Password')
                ->onlyOnForms()
                ->creationRules('required', 'string', 'min:6')
                ->updateRules('nullable', 'string', 'min:6')
            ,

            PasswordConfirmation::make('Password Confirmation'),
        ];
    }

    private function getEmployeeAboutTabFields(): array
    {
        return array_merge([
            Text::make('Employee', function () {
                $url = '/admin/resources/employees/' . $this->employee->id;

                return "<a href='$url'>{$this->employee->name}</a>";
            })->asHtml(),
        ], $this->getAboutTabFields());
    }

    private function getClientTabs(): array
    {
        return [
            new Tabs('Tabs', [
                'About' => $this->getAboutTabFields(),
            ]),
        ];
    }

    private function getEmployeeTabs(): array
    {
        return [
            new Tabs('Tabs', [
                new Panel('About', $this->getEmployeeAboutTabFields()),
            ])
        ];
    }

    private function getAdminTabs(): array
    {
        return [
            new Tabs('Tabs', [
                'About' => $this->getManagerTabFields(),
                HasOne::make('Verification', 'verify_photo', Verification::class),
            ]),
        ];
    }

    private function getClubOwnerTabs(): array
    {
        return [
            new Tabs('Tabs', [
                'About' => array_merge($this->getAboutTabFields(), [
                    MorphMany::make('Clubs'),
                    HasOne::make('Verification', 'verify_photo', Verification::class),
                ]),
            ]),
        ];
    }
}

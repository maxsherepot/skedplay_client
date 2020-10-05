<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;
use Spatie\MediaLibrary\Models\Media;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        \Modules\Users\Entities\User::class                     => \Modules\Users\Policies\UserPolicy::class,
        \Modules\Clubs\Entities\Club::class                     => \Modules\Clubs\Policies\ClubPolicy::class,
        \Modules\Employees\Entities\Employee::class             => \Modules\Employees\Policies\EmployeePolicy::class,
        \Modules\Events\Entities\Event::class                   => \Modules\Events\Policies\EventPolicy::class,
        \Modules\Common\Entities\Service::class                 => \Modules\Common\Policies\ServicePolicy::class,
        \Modules\Common\Entities\PriceType::class               => \Modules\Common\Policies\PriceTypePolicy::class,
        \Modules\Common\Entities\ContactRequest::class          => \Modules\Common\Policies\ContactRequestPolicy::class,
        \Modules\Main\Entities\Language::class                  => \Modules\Main\Policies\LanguagePolicy::class,
        \Modules\Main\Entities\UiTranslate::class               => \Modules\Main\Policies\UiTranslatePolicy::class,
        \Modules\Users\Entities\Role::class                     => \Modules\Users\Policies\RolePolicy::class,
        \Modules\Clubs\Entities\ClubType::class                 => \Modules\Clubs\Policies\ClubTypePolicy::class,
        \Modules\Events\Entities\EventType::class               => \Modules\Events\Policies\EventTypePolicy::class,
        \Modules\Common\Entities\GroupService::class            => \Modules\Common\Policies\GroupServicePolicy::class,
        \Modules\Employees\Entities\EmployeeRaceType::class     => \Modules\Employees\Policies\EmployeeRaceTypePolicy::class,
        \Modules\Employees\Entities\EmployeeComplaint::class    => \Modules\Employees\Policies\EmployeeComplaintPolicy::class,
        \Modules\Common\Entities\ContactPhone::class            => \Modules\Common\Policies\ContactPhonePolicy::class,
        \Modules\Main\Entities\Page::class                      => \Modules\Main\Policies\PagePolicy::class,
        \Modules\Common\Entities\HelpCenterCategory::class      => \Modules\Common\Policies\HelpCenterCategoryPolicy::class,
        \Modules\Common\Entities\HelpCenterTopic::class         => \Modules\Common\Policies\HelpCenterTopicPolicy::class,
        \Modules\Employees\Entities\GirlPattern::class          => \Modules\Employees\Policies\EmployeePatternPolicy::class,
        \Modules\Employees\Entities\TransPattern::class         => \Modules\Employees\Policies\EmployeePatternPolicy::class,
        \Modules\Employees\Entities\VipPattern::class           => \Modules\Employees\Policies\EmployeePatternPolicy::class,
        \Modules\Clubs\Entities\ClubPattern::class              => \Modules\Clubs\Policies\ClubPatternPolicy::class,
        \Modules\Events\Entities\EventPattern::class            => \Modules\Clubs\Policies\ClubPatternPolicy::class,
        \Modules\Common\Entities\EventCount::class              => \Modules\Common\Policies\ReadOnlyPolicy::class,
        \Modules\Common\Entities\Setting::class              => \Modules\Common\Policies\SettingPolicy::class,

        \Modules\Common\Entities\EmailTemplate::class           => \Modules\Common\Policies\EmailTemplatePolicy::class,
        \Modules\Common\Entities\SubscribeClub::class           => \Modules\Common\Policies\SubscribeClubPolicy::class,
        \Modules\Common\Entities\SubscribeEmployee::class       => \Modules\Common\Policies\SubscribeEmployeePolicy::class,

        Media::class                                            => \Modules\Main\Policies\MediaPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }
}

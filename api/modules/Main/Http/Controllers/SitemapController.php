<?php

namespace Modules\Main\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Modules\Clubs\Entities\Club;
use Modules\Clubs\Entities\ClubType;
use Modules\Common\Entities\Canton;
use Modules\Common\Entities\HelpCenterTopic;
use Modules\Common\Entities\Service;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeRaceType;
use Modules\Events\Entities\EventType;
use Modules\Main\Entities\Language;

class SitemapController extends Controller
{
    public function __invoke()
    {
        $sitemap = app()->make('sitemap');

        $sitemap->setCache('sitemap', 60);

        if ($sitemap->isCached()) {
            return $sitemap->render('xml');
        }

        $languages = Language::where('active', 1)->get();
        $cantons = Canton::with('cities')->get();
        $services = Service::all();
        $employeeRaceTypes = EmployeeRaceType::all();
        $clubTypes = ClubType::all();
        $eventTypes = EventType::all();

        foreach ($languages as $language) {
            $langPrefix = $language->code === 'de'
                ? ''
                : '/' . $language->code;

            $this->addSimplePages($sitemap, $langPrefix);
            $this->addEmployeesPages($sitemap, $langPrefix);
            $this->addClubsPages($sitemap, $langPrefix);
            $this->addHelpCenterPages($sitemap, $langPrefix);

            $this->addEmployeesFilters($cantons, $sitemap, $langPrefix, $employeeRaceTypes, $services);
            $this->addEntityFilters('clubs', $cantons, $sitemap, $langPrefix, $clubTypes);
            $this->addEntityFilters('events', $cantons, $sitemap, $langPrefix, $eventTypes);
        }

        return $sitemap->render('xml');
    }

    private function url(string $to, string $langPrefix, ?string $queryString = null): string
    {
        $url = config('app.front_app_url');

        if ($to === '') {
            return "$url$langPrefix$to";
        }

        if ($queryString) {
            return "$url$langPrefix$to/?$queryString";
        }

        return "$url$langPrefix$to/";
    }

    private function addSimplePages($sitemap, string $langPrefix): void
    {
        $sitemap->add($this->url('', $langPrefix), now()->toIso8601String(), '1.0', 'daily');
        $sitemap->add($this->url('/about', $langPrefix), now()->toIso8601String(), '1.0', 'daily');
        $sitemap->add($this->url('/help-center', $langPrefix), now()->toIso8601String(), '1.0', 'daily');
        $sitemap->add($this->url('/girls', $langPrefix), now()->toIso8601String(), '1.0', 'daily');
        $sitemap->add($this->url('/trans', $langPrefix), now()->toIso8601String(), '1.0', 'daily');
        $sitemap->add($this->url('/vip-escort', $langPrefix), now()->toIso8601String(), '1.0', 'daily');
        $sitemap->add($this->url('/clubs', $langPrefix), now()->toIso8601String(), '1.0', 'daily');
        $sitemap->add($this->url('/events', $langPrefix), now()->toIso8601String(), '1.0', 'daily');
    }

    private function addEmployeesPages($sitemap, string $langPrefix): void
    {
        $employees = Employee::with('events', 'city.canton')
            ->where('show_level', Employee::SHOW_LEVEL_ACTIVE)
            ->where('fake', 0)
            ->where('status', 1)
            ->where('user_status', 1)
            ->get();

        foreach ($employees as $employee) {
            $employeeType = $employee->type === 1
                ? 'girls'
                : 'trans';

            $employeePages = [
                'information',
                'reviews',
                'events',
            ];

            if (!$employee->city) {
                $urlPrefix = "/employees/$employee->id";
            } else {
                $canton = Str::slug($employee->city->canton->name);
                $city = Str::slug($employee->city->name);

                $urlPrefix = "/$employeeType/$canton/$city/$employee->id";
            }

            foreach ($employeePages as $employeePage) {
                $sitemap->add(
                    $this->url("$urlPrefix/$employeePage", $langPrefix),
                    now()->toIso8601String(),
                    '1.0',
                    'daily'
                );
            }

            foreach ($employee->events as $event) {
                if ($event->status !== 1 || $event->user_status !== 1) {
                    continue;
                }

                $sitemap->add(
                    $this->url("$urlPrefix/events/$event->id", $langPrefix),
                    now()->toIso8601String(),
                    '1.0',
                    'daily'
                );
            }
        }
    }

    private function addClubsPages($sitemap, string $langPrefix): void
    {
        $clubs = Club::with('events', 'city.canton')
            ->where('status', 1)
            ->where('user_status', 1)
            ->get();

        foreach ($clubs as $club) {
            $canton = Str::slug($club->city->canton->name);
            $city = Str::slug($club->city->name);

            $clubPages = [
                'information',
                'girls',
                'events',
            ];

            foreach ($clubPages as $clubPage) {
                $sitemap->add(
                    $this->url("/clubs/$canton/$city/$club->id/$clubPage", $langPrefix),
                    now()->toIso8601String(),
                    '1.0',
                    'daily'
                );
            }

            foreach ($club->events as $event) {
                if ($event->status !== 1 || $event->user_status !== 1) {
                    continue;
                }

                $sitemap->add(
                    $this->url("/clubs/$canton/$city/$club->id/events/$event->id", $langPrefix),
                    now()->toIso8601String(),
                    '1.0',
                    'daily'
                );
            }
        }
    }

    private function addHelpCenterPages($sitemap, string $langPrefix): void
    {
        $helpCenterTopics = HelpCenterTopic::all();

        foreach ($helpCenterTopics as $helpCenterTopic) {
            $sitemap->add(
                $this->url("/helpcenter/$helpCenterTopic->slug", $langPrefix),
                now()->toIso8601String(),
                '1.0',
                'daily'
            );
        }
    }

    private function addEmployeesFilters(Collection $cantons, $sitemap, string $langPrefix, Collection $employeeRaceTypes, Collection $services): void
    {
        foreach (['girls', 'trans'] as $girlType) {
            foreach ($cantons as $canton) {
                $cantonSlug = Str::slug($canton->name);

                $sitemap->add(
                    $this->url("/$girlType/$cantonSlug", $langPrefix),
                    now()->toIso8601String(),
                    '1.0',
                    'daily'
                );

                foreach ($employeeRaceTypes as $employeeRaceType) {
                    $sitemap->add(
                        $this->url(
                            "/$girlType/$cantonSlug",
                            $langPrefix,
                            http_build_query([
                                'types' => Str::slug($employeeRaceType->name)
                            ])
                        ),
                        now()->toIso8601String(),
                        '1.0',
                        'daily'
                    );
                }

                foreach ($services as $service) {
                    $sitemap->add(
                        $this->url(
                            "/$girlType/$cantonSlug",
                            $langPrefix,
                            http_build_query([
                                'services' => Str::slug($service->name)
                            ])
                        ),
                        now()->toIso8601String(),
                        '1.0',
                        'daily'
                    );
                }

                $ages = [
                    [20],
                    [30],
                    [20, 30],
                    [30, 40],
                    [50],
                ];

                foreach ($ages as $age) {
                    $ageParams = [];

                    $ageParams['age_from'] = $age[0];

                    if ($age[1] ?? false) {
                        $ageParams['age_to'] = $age[1];
                    }

                    $sitemap->add(
                        $this->url(
                            "/$girlType/$cantonSlug",
                            $langPrefix,
                            http_build_query($ageParams)
                        ),
                        now()->toIso8601String(),
                        '1.0',
                        'daily'
                    );
                }

                if (config('app.city_filter')) {
                    foreach ($canton->cities as $city) {
                        $citySlug = Str::slug($city->name);

                        $sitemap->add(
                            $this->url("/$girlType/$cantonSlug/$citySlug", $langPrefix),
                            now()->toIso8601String(),
                            '1.0',
                            'daily'
                        );

                        foreach ($employeeRaceTypes as $employeeRaceType) {
                            $sitemap->add(
                                $this->url(
                                    "/$girlType/$cantonSlug/$citySlug",
                                    $langPrefix,
                                    http_build_query([
                                        'types' => Str::slug($employeeRaceType->name)
                                    ])
                                ),
                                now()->toIso8601String(),
                                '1.0',
                                'daily'
                            );
                        }

                        foreach ($services as $service) {
                            $sitemap->add(
                                $this->url(
                                    "/$girlType/$cantonSlug/$citySlug",
                                    $langPrefix,
                                    http_build_query([
                                        'services' => Str::slug($service->name)
                                    ])
                                ),
                                now()->toIso8601String(),
                                '1.0',
                                'daily'
                            );
                        }

                        foreach ($ages as $age) {
                            $ageParams = [];

                            $ageParams['age_from'] = $age[0];

                            if ($age[1] ?? false) {
                                $ageParams['age_to'] = $age[1];
                            }

                            $sitemap->add(
                                $this->url(
                                    "/$girlType/$cantonSlug/$citySlug",
                                    $langPrefix,
                                    http_build_query($ageParams)
                                ),
                                now()->toIso8601String(),
                                '1.0',
                                'daily'
                            );
                        }
                    }
                }
            }
        }
    }

    private function addEntityFilters(string $entity, Collection $cantons, $sitemap, string $langPrefix, Collection $types): void
    {
        foreach ($cantons as $canton) {
            $cantonSlug = Str::slug($canton->name);

            $sitemap->add(
                $this->url("/clubs/$cantonSlug", $langPrefix),
                now()->toIso8601String(),
                '1.0',
                'daily'
            );

            foreach ($types as $type) {
                $sitemap->add(
                    $this->url(
                        "/$entity/$cantonSlug",
                        $langPrefix,
                        http_build_query([
                            'types' => Str::slug($type->name)
                        ])
                    ),
                    now()->toIso8601String(),
                    '1.0',
                    'daily'
                );
            }

            if (config('app.city_filter')) {
                foreach ($canton->cities as $city) {
                    $citySlug = Str::slug($city->name);

                    $sitemap->add(
                        $this->url("/$entity/$cantonSlug/$citySlug", $langPrefix),
                        now()->toIso8601String(),
                        '1.0',
                        'daily'
                    );

                    foreach ($types as $type) {
                        $sitemap->add(
                            $this->url(
                                "/$entity/$cantonSlug/$citySlug",
                                $langPrefix,
                                http_build_query([
                                    'types' => Str::slug($type->name)
                                ])
                            ),
                            now()->toIso8601String(),
                            '1.0',
                            'daily'
                        );
                    }
                }
            }
        }
    }

}

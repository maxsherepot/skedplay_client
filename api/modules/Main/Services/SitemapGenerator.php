<?php declare(strict_types=1);

namespace Modules\Main\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Laravelium\Sitemap\Sitemap;
use Modules\Clubs\Entities\Club;
use Modules\Clubs\Entities\ClubType;
use Modules\Common\Entities\Canton;
use Modules\Common\Entities\HelpCenterTopic;
use Modules\Common\Entities\Service;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeRaceType;
use Modules\Events\Entities\EventType;
use Modules\Main\Entities\Language;
use function foo\func;

final class SitemapGenerator
{
    /**
     * @var Sitemap
     * */
    private $sitemap;

    /**
     * @var Collection|Language[]
     * */
    private $languages;

    public function generate(): Sitemap
    {
        $this->sitemap = app()->make('sitemap');

//        $this->sitemap->setCache('sitemap', 60);
//
//        if ($this->sitemap->isCached()) {
//            return $this->sitemap;
//        }

        $this->languages = Language::where('active', 1)->get();

        $cantons = Canton::with('cities')->get();
        $services = Service::all();
        $employeeRaceTypes = EmployeeRaceType::all();
        $clubTypes = ClubType::all();
        $eventTypes = EventType::all();

        $this->addSimplePages();
        $this->addEmployeesPages();
        $this->addClubsPages();
        $this->addHelpCenterPages();

        $this->addEmployeesFilters($cantons, $employeeRaceTypes, $services);
        $this->addEntityFilters('clubs', $cantons, $clubTypes);
        $this->addEntityFilters('events', $cantons, $eventTypes);

        return $this->sitemap;
    }

    private function add(string $to, ?string $queryString = null): void
    {
        $translations = $this->languages
            ->map(function(Language $language) use ($to, $queryString) {
                return [
                    'language' => $language->code,
                    'url' => $this->url($to, $language, $queryString)
                ];
            })
            ->toArray();

        foreach ($this->languages as $language) {
            $this->sitemap->add(
                $this->url($to, $language, $queryString),
                null, null, null, [], null,
                $translations
            );
        }
    }

    private function url(string $to, Language $lang, ?string $queryString = null): string
    {
        $url = config('app.front_app_url');

        if ($to === '' && $lang->code === 'de') {
            return "$url$lang->url_prefix$to";
        }

        if ($queryString) {
            return "$url$lang->url_prefix$to/?$queryString";
        }

        return "$url$lang->url_prefix$to/";
    }

    private function addSimplePages(): void
    {
        $this->add('');
        $this->add('/about');
        $this->add('/help-center');
        $this->add('/girls');
        $this->add('/trans');
        $this->add('/vip-escort');
        $this->add('/clubs');
        $this->add('/events');
    }

    private function addEmployeesPages(): void
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
                $this->add("$urlPrefix/$employeePage");
            }

            foreach ($employee->events as $event) {
                if ($event->status !== 1 || $event->user_status !== 1) {
                    continue;
                }

                $this->add("$urlPrefix/events/$event->id");
            }
        }
    }

    private function addClubsPages(): void
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
                $this->add("/clubs/$canton/$city/$club->id/$clubPage");
            }

            foreach ($club->events as $event) {
                if ($event->status !== 1 || $event->user_status !== 1) {
                    continue;
                }

                $this->add("/clubs/$canton/$city/$club->id/events/$event->id");
            }
        }
    }

    private function addHelpCenterPages(): void
    {
        $helpCenterTopics = HelpCenterTopic::all();

        foreach ($helpCenterTopics as $helpCenterTopic) {
            $this->add("/helpcenter/$helpCenterTopic->slug");
        }
    }

    private function addEmployeesFilters(Collection $cantons, Collection $employeeRaceTypes, Collection $services): void
    {
        foreach (['girls', 'trans'] as $girlType) {
            foreach ($cantons as $canton) {
                $cantonSlug = Str::slug($canton->name);

                $this->add("/$girlType/$cantonSlug");

                foreach ($employeeRaceTypes as $employeeRaceType) {
                    $this->add(
                        "/$girlType/$cantonSlug",
                        http_build_query([
                            'types' => Str::slug($employeeRaceType->name)
                        ])
                    );
                }

                foreach ($services as $service) {
                    $this->add(
                        "/$girlType/$cantonSlug",
                        http_build_query([
                            'services' => Str::slug($service->name)
                        ])
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

                    $this->add(
                        "/$girlType/$cantonSlug",
                        http_build_query($ageParams)
                    );
                }

                if (config('app.city_filter')) {
                    foreach ($canton->cities as $city) {
                        $citySlug = Str::slug($city->name);

                        $this->add("/$girlType/$cantonSlug/$citySlug");

                        foreach ($employeeRaceTypes as $employeeRaceType) {
                            $this->add(
                                "/$girlType/$cantonSlug/$citySlug",
                                http_build_query([
                                    'types' => Str::slug($employeeRaceType->name)
                                ])
                            );
                        }

                        foreach ($services as $service) {
                            $this->add(
                                "/$girlType/$cantonSlug/$citySlug",
                                http_build_query([
                                    'services' => Str::slug($service->name)
                                ])
                            );
                        }

                        foreach ($ages as $age) {
                            $ageParams = [];

                            $ageParams['age_from'] = $age[0];

                            if ($age[1] ?? false) {
                                $ageParams['age_to'] = $age[1];
                            }

                            $this->add(
                                "/$girlType/$cantonSlug/$citySlug",
                                http_build_query($ageParams)
                            );
                        }
                    }
                }
            }
        }
    }

    private function addEntityFilters(string $entity, Collection $cantons, Collection $types): void
    {
        foreach ($cantons as $canton) {
            $cantonSlug = Str::slug($canton->name);

            $this->add("/$entity/$cantonSlug");

            foreach ($types as $type) {
                $this->add(
                    "/$entity/$cantonSlug",
                    http_build_query([
                        'types' => Str::slug($type->name)
                    ])
                );
            }

            if (config('app.city_filter')) {
                foreach ($canton->cities as $city) {
                    $citySlug = Str::slug($city->name);

                    $this->add("/$entity/$cantonSlug/$citySlug");

                    foreach ($types as $type) {
                        $this->add(
                            "/$entity/$cantonSlug/$citySlug",
                            http_build_query([
                                'types' => Str::slug($type->name)
                            ])
                        );
                    }
                }
            }
        }
    }
}

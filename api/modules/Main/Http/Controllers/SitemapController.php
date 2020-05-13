<?php

namespace Modules\Main\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\HelpCenterTopic;
use Modules\Employees\Entities\Employee;
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

        foreach ($languages as $language) {
            $langPrefix = $language->code === 'de'
                ? ''
                : '/' . $language->code;

            $this->addSimplePages($sitemap, $langPrefix);
            $this->addEmployeesPages($sitemap, $langPrefix);
            $this->addClubsPages($sitemap, $langPrefix);
            $this->addHelpCenterPages($sitemap, $langPrefix);
        }

        return $sitemap->render('xml');
    }

    private function url(string $to, string $langPrefix): string
    {
        $url = config('app.front_app_url');

        if ($to === '') {
            return "$url$langPrefix$to";
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
        $employees = Employee::with('events', 'city.canton')->get();

        foreach ($employees as $employee) {
            $employeeType = $employee->type === 1
                ? 'girls'
                : 'trans';

            $canton = Str::slug($employee->city->canton->name);
            $city = Str::slug($employee->city->name);

            $employeePages = [
                'information',
                'reviews',
                'events',
            ];

            foreach ($employeePages as $employeePage) {
                $sitemap->add(
                    $this->url("/$employeeType/$canton/$city/$employee->id/$employeePage", $langPrefix),
                    now()->toIso8601String(),
                    '1.0',
                    'daily'
                );
            }

            foreach ($employee->events as $event) {
                $sitemap->add(
                    $this->url("/$employeeType/$canton/$city/$employee->id/events/$event->id", $langPrefix),
                    now()->toIso8601String(),
                    '1.0',
                    'daily'
                );
            }
        }
    }

    private function addClubsPages($sitemap, string $langPrefix): void
    {
        $clubs = Club::with('events', 'city.canton')->get();

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
}

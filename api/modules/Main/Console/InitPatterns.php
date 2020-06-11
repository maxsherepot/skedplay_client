<?php

namespace Modules\Main\Console;

use Illuminate\Console\Command;
use Modules\Clubs\Entities\ClubPattern;
use Modules\Employees\Entities\GirlPattern;
use Modules\Employees\Entities\TransPattern;
use Modules\Employees\Entities\VipPattern;
use Modules\Events\Entities\EventPattern;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class InitPatterns extends Command
{
    protected $signature = 'patterns:init';

    protected $description = 'Command description.';

    public const GIRL_PATTERNS = [
        'h1' => [
            'value_without_city' => '#services# Sex and escort {in:canton} #canton#',
            'value_with_city' => '#services# Sex and escort {in:canton} #canton# #city# {city:city}',
        ],

        'title' => [
            'value_without_city' => '#services# Sex and escort {in:canton} #canton# -- catalog of girls 2020',
            'value_with_city' => '#services# Sex and escort {in:canton} #canton# #city# {city:city} -- catalog of girls 2020',
        ],

        'description' => [
            'value_without_city' => 'Catalog of girls for sex and escort {in:canton} #canton#. More than 3000 girls {for:services} #services# on site',
            'value_with_city' => 'Catalog of girls for sex and escort {in:canton} #canton# #city# {city:city}. More than 3000 girls {for:services} #services# on site',
        ],

        'keywords' => [
            'value_without_city' => '{sex:canton} #canton#, {escort:canton} #canton#, {sex:services} [services: ], {escort:services} [services: ], skedplay',
            'value_with_city' => '{sex:canton} #canton#, {escort:canton} #canton#, {sex:city} #city#, {escort:city} #city#, {sex:services} [services: ], {escort:services} [services: ], skedplay',
        ],
    ];

    public const CLUB_PATTERNS = [
        'h1' => [
            'value_without_city' => 'Sex clubs {and:types} #types# {in:canton} #canton#',
            'value_with_city' => 'Sex clubs {and:types} #types# {in:canton} #canton# #city# {city:city}',
        ],

        'title' => [
            'value_without_city' => 'Sex clubs {and:types} #types# {in:canton} #canton# -- full catalog of clubs',
            'value_with_city' => 'Sex clubs {and:types} #types# {in:canton} #canton# #city# {city:city} -- full catalog of clubs',
        ],

        'description' => [
            'value_without_city' => 'Catalog of clubs for sex and escort {in:canton} #canton#. More than 300 [types:, :clubs] on site',
            'value_with_city' => 'Catalog of clubs for sex and escort {in:canton} #canton# #city# {city:city}. More than 300 [types:, :clubs] on site',
        ],

        'keywords' => [
            'value_without_city' => '{sex clubs:canton} #canton#, #types#, skedplay',
            'value_with_city' => '{sex clubs:canton} #canton#, {sex clubs:city} #city#, #types#, skedplay',
        ],
    ];

    public const EVENT_PATTERNS = [
        'h1' => [
            'value_without_city' => 'Sex events {and:types} #types# {in:canton} #canton#',
            'value_with_city' => 'Sex events {and:types} #types# {in:canton} #canton# #city# {city:city}',
        ],

        'title' => [
            'value_without_city' => 'Sex events {and:types} #types# {in:canton} #canton# -- full catalog of events',
            'value_with_city' => 'Sex events {and:types} #types# {in:canton} #canton# #city# {city:city} -- full catalog of events',
        ],

        'description' => [
            'value_without_city' => 'Catalog of events for sex and escort {in:canton} #canton#. More than 300 [types:, :events] on site',
            'value_with_city' => 'Catalog of events for sex and escort {in:canton} #canton# #city# {city:city}. More than 300 [types:, :events] on site',
        ],

        'keywords' => [
            'value_without_city' => '{sex events:canton} #canton#, #types#, skedplay',
            'value_with_city' => '{sex events:canton} #canton#, {sex events:city} #city#, #types#, skedplay',
        ],
    ];

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        foreach (self::GIRL_PATTERNS as $type => $pattern) {
            if (GirlPattern::where('type', $type)->first()) {
                continue;
            }

            GirlPattern::create(array_merge($pattern, [
                'type' => $type
            ]));
        }

        foreach (self::GIRL_PATTERNS as $type => $pattern) {
            if (TransPattern::where('type', $type)->first()) {
                continue;
            }

            TransPattern::create(array_merge($pattern, [
                'type' => $type
            ]));
        }

        foreach (self::GIRL_PATTERNS as $type => $pattern) {
            if (VipPattern::where('type', $type)->first()) {
                continue;
            }

            VipPattern::create(array_merge($pattern, [
                'type' => $type
            ]));
        }

        foreach (self::CLUB_PATTERNS as $type => $pattern) {
            if (ClubPattern::where('type', $type)->first()) {
                continue;
            }

            ClubPattern::create(array_merge($pattern, [
                'type' => $type
            ]));
        }

        foreach (self::EVENT_PATTERNS as $type => $pattern) {
            if (EventPattern::where('type', $type)->first()) {
                continue;
            }

            EventPattern::create(array_merge($pattern, [
                'type' => $type
            ]));
        }
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['example', InputArgument::REQUIRED, 'An example argument.'],
        ];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
        ];
    }
}

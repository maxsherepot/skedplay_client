<?php

namespace Modules\Main\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Clubs\Entities\ClubPattern;
use Modules\Clubs\Entities\ClubType;
use Modules\Common\Entities\Canton;
use Modules\Common\Entities\City;
use Modules\Common\Entities\Service;
use Modules\Employees\Entities\GirlPattern;
use Modules\Employees\Entities\TransPattern;
use Modules\Employees\Entities\VipPattern;
use Modules\Events\Entities\EventPattern;
use Modules\Events\Entities\EventType;
use Modules\Main\Services\Pattern\Club\ClubPatternData;
use Modules\Main\Services\Pattern\Club\ClubPatternParser;
use Modules\Main\Services\Pattern\Employee\EmployeePatternData;
use Modules\Main\Services\Pattern\Employee\EmployeePatternParser;
use Modules\Main\Services\Pattern\Event\EventPatternData;
use Modules\Main\Services\Pattern\Event\EventPatternParser;

class SeoController extends Controller
{
    public function employees(GraphQLFormRequest $request, EmployeePatternParser $employeePatternParser)
    {
        [$cantonModel, $cityModel] = $this->getLocationModels($request);

        $serviceModels = Service::all();

        $services = $request->input('input.services', []);

        $serviceModels = $serviceModels
            ->filter(function(Service $service) use ($services) {
                return in_array(Str::slug($service->name), $services, true);
            })
            ->values();

        if (!$cantonModel && !$cityModel && !$serviceModels->count()) {
            return [
                'h1' => null,
                'title' => null,
                'description' => null,
                'keywords' => null,
            ];
        }

        $employeeType = $request->input('input.employee_type');

        if ($employeeType === 'girls') {
            $patterns = GirlPattern::all()->keyBy('type');
        } elseif ($employeeType === 'trans') {
            $patterns = TransPattern::all()->keyBy('type');
        } elseif ($employeeType === 'vip-escort') {
            $patterns = VipPattern::all()->keyBy('type');
        } else {
            throw new \Exception('unknown employee type: ' . $employeeType);
        }

        $employeePatternData = new EmployeePatternData(
            $serviceModels,
            $cantonModel,
            $cityModel
        );

        $patternValueField = config('app.city_filter') ? 'value_with_city' : 'value_without_city';

        $types = ['h1', 'title', 'description', 'keywords'];

        return collect($types)
            ->mapWithKeys(
                function(string $type) use ($employeePatternParser, $patterns, $patternValueField, $employeePatternData) {
                    /** @var GirlPattern $pattern */
                    $pattern = $patterns[$type];

                    $patternTranslations = collect($pattern->getTranslations($patternValueField))
                        ->map(function(string $pattern) use ($employeePatternParser, $employeePatternData) {
                            return $employeePatternParser->parse(
                                $pattern,
                                $employeePatternData
                            );
                        })->toJson();

                    return [
                        $type => $patternTranslations
                    ];
                }
            )
            ->toArray();
    }

    public function clubs(GraphQLFormRequest $request, ClubPatternParser $patternParser)
    {
        [$cantonModel, $cityModel] = $this->getLocationModels($request);

        $typeModels = ClubType::all();

        $types = collect($request->input('input.types', []))
            ->filter(function(string $type) {
                return $type !== 'club';
            })
            ->values()
            ->toArray();

        $typeModels = $typeModels
            ->filter(function(ClubType $typeModel) use ($types) {
                return in_array(Str::slug($typeModel->name), $types, true);
            })
            ->values();

        if (!$cantonModel && !$cityModel && !$typeModels->count()) {
            return [
                'h1' => null,
                'title' => null,
                'description' => null,
                'keywords' => null,
            ];
        }

        $patterns = ClubPattern::all()->keyBy('type');

        $patternData = new ClubPatternData(
            $typeModels,
            $cantonModel,
            $cityModel
        );

        $patternValueField = config('app.city_filter') ? 'value_with_city' : 'value_without_city';

        $types = ['h1', 'title', 'description', 'keywords'];

        return collect($types)
            ->mapWithKeys(
                function(string $type) use ($patternParser, $patterns, $patternValueField, $patternData) {
                    /** @var ClubPattern $pattern */
                    $pattern = $patterns[$type];

                    return [
                        $type => $patternTranslations = collect($pattern->getTranslations($patternValueField))
                            ->map(function(string $pattern) use ($patternParser, $patternData) {
                                return $patternParser->parse(
                                    $pattern,
                                    $patternData
                                );
                            })->toJson()
                    ];
                }
            )
            ->toArray();
    }

    public function events(GraphQLFormRequest $request, EventPatternParser $patternParser)
    {
        [$cantonModel, $cityModel] = $this->getLocationModels($request);

        $typeModels = EventType::all();

        $types = $request->input('input.types', []);

        $typeModels = $typeModels
            ->filter(function(EventType $typeModel) use ($types) {
                return in_array(Str::slug($typeModel->name), $types, true);
            })
            ->values();

        if (!$cantonModel && !$cityModel && !$typeModels->count()) {
            return [
                'h1' => null,
                'title' => null,
                'description' => null,
                'keywords' => null,
            ];
        }

        $patterns = EventPattern::all()->keyBy('type');

        $patternData = new EventPatternData(
            $typeModels,
            $cantonModel,
            $cityModel
        );

        $patternValueField = config('app.city_filter') ? 'value_with_city' : 'value_without_city';

        $types = ['h1', 'title', 'description', 'keywords'];

        return collect($types)
            ->mapWithKeys(
                function(string $type) use ($patternParser, $patterns, $patternValueField, $patternData) {
                    /** @var ClubPattern $pattern */
                    $pattern = $patterns[$type];

                    return [
                        $type => $patternTranslations = collect($pattern->getTranslations($patternValueField))
                            ->map(function(string $pattern) use ($patternParser, $patternData) {
                                return $patternParser->parse(
                                    $pattern,
                                    $patternData
                                );
                            })->toJson()
                    ];
                }
            )
            ->toArray();
    }

    private function getLocationModels(GraphQLFormRequest $request): array
    {
        $cantons = Canton::all();
        $cities = City::all();

        $canton = $request->input('input.canton');
        $city = $request->input('input.city');

        $cantonModel = $cantons
            ->filter(function (Canton $cantonModel) use ($canton) {
                return Str::slug($cantonModel->name) === $canton;
            })
            ->first();

        $cityModel = $cities
            ->filter(function (City $cityModel) use ($city) {
                return Str::slug($cityModel->name) === $city;
            })
            ->first();

        return [$cantonModel, $cityModel];
    }
}

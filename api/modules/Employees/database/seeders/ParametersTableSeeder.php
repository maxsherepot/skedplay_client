<?php

namespace Modules\Employees\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\Employees\Entities\Parameter;
use Modules\Employees\Services\ParameterOption;

class ParametersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $parameters = [
            'Hair'        => Parameter::HAIR_OPTIONS,
            'Eye'         => Parameter::EYE_OPTIONS,
            'Growth'      => Parameter::GROWTH_OPTIONS,
            'Weight'      => Parameter::WEIGHT_OPTIONS,
            'Breast size' => Parameter::BREAST_SIZE_OPTIONS,
            'Body'        => Parameter::BODY_OPTIONS,
        ];

        if (Parameter::count()) {
            return;
        }

        foreach ($parameters as $key => $options) {
            DB::beginTransaction();

            /** @var Parameter $parameter */
            $parameter = Parameter::create([
                'name' => ['en' => $key],
            ]);

            foreach ($options as $option) {
                $parameter->options()->create([
                    'value' => ['en' => $option]
                ]);
            }

            DB::commit();
        }
    }


}

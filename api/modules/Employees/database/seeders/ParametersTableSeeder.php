<?php

namespace Modules\Employees\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Employees\Entities\Parameter;

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
            'hair'        => Parameter::HAIR_OPTIONS,
            'eye'         => Parameter::EYE_OPTIONS,
            'growth'      => Parameter::GROWTH_OPTIONS,
            'weight'      => Parameter::WEIGHT_OPTIONS,
            'breast_size' => Parameter::BREAST_SIZE_OPTIONS,
            'body'        => Parameter::BODY_OPTIONS,
        ];

        foreach ($parameters as $key => $options) {
            Parameter::create([
                'name'         => $key,
                'display_name' => str_replace('_', ' ', ucfirst($key)),
                'options'      => $options ? $this->getOptions($key, $options) : null,
            ]);
        }
    }

    public function getOptions($key, $parameters)
    {
        $options = [];

        foreach ($parameters as $parameter) {
            switch ($key) {
                case "hair":
                case "eye":
                case "body":
                    array_push($options, [
                        'label' => __("parameters.$key.$parameter", ['parameter' => $parameter]),
                        'value' => $parameter,
                    ]);
                    break;
                case "growth":
                case "weight":
                case "breast_size":
                    array_push($options, [
                        'label' => __("parameters.$key", ['parameter' => $parameter]),
                        'value' => $parameter,
                    ]);
                    break;

                default:
                    break;
            }

        }

        return $options;
    }
}

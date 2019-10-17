<?php declare(strict_types=1);

namespace Modules\Employees\Services;

trait ParameterOption
{
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
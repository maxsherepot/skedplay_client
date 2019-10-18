<?php declare(strict_types=1);

namespace Modules\Employees\Services;

class ParameterOption
{
    public function getOptions($key, $parameters)
    {
        $options = [];

        foreach ($parameters as $parameter) {
            array_push($options, [
                'label' => $this->getTranslation($key, $parameter),
                'value' => $parameter,
            ]);
        }

        return $options;
    }

    /**
     * @param $key
     * @param $parameter
     * @return array|string|null
     */
    public function getTranslation($key, $parameter)
    {
        $translation = null;

        switch ($key) {
            case "hair":
            case "eye":
            case "body":
                $translation = $this->getKeyWithParameterTrans($key, $parameter);
                break;
            case "growth":
            case "weight":
            case "breast_size":
                $translation = $this->getKeyTrans($key, $parameter);
                break;

            default:
                break;
        }

        return $translation;
    }

    private function getKeyTrans(string $key, $parameter)
    {
        return __("parameters.$key", ['parameter' => $parameter]);
    }

    private function getKeyWithParameterTrans(string $key, $parameter)
    {
        return __("parameters.$key.$parameter", ['parameter' => $parameter]);
    }
}

<?php

namespace Modules\Api\GraphQL\Type;

use Modules\Employees\Entities\EmployeeParameter;

class ParameterType
{
    /**
     * @param EmployeeParameter $rootValue
     * @return string
     */
    function display_value(EmployeeParameter $rootValue)
    {
        return $rootValue->display_value;
    }
}
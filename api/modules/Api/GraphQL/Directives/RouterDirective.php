<?php

namespace Modules\Api\GraphQL\Directives;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use Illuminate\Routing\RouteSignatureParameters;
use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\FieldResolver;

class RouterDirective extends BaseDirective implements FieldResolver
{

    /**
     * Name of the directive.
     *
     * @return string
     */
    public function name(): string
    {
        return 'router';
    }

    /**
     * @param FieldValue $fieldValue
     * @return FieldValue
     */
    public function resolveField(FieldValue $fieldValue): FieldValue
    {
        $action = $this->directiveArgValue('action');

        return $fieldValue->setResolver(
            function ($root, array $parameters) use ($action) {

                request()->request->replace($parameters);

                foreach (RouteSignatureParameters::fromAction(['uses' => $action]) as $parameter) {
                    if (! $parameterName = static::getParameterName($parameter->name, $parameters)) {
                        continue;
                    }

                    $parameterValue = $parameters[$parameterName];

                    $instance = app()->make($parameter->getClass()->name);

                    if (! $model = $instance->resolveRouteBinding($parameterValue)) {
                        throw (new ModelNotFoundException)->setModel(get_class($instance), [$parameterValue]);
                    }

                    $parameters[$parameterName] = $model;
                }

                return app()->call($action, $parameters);

            }
        );
    }


    /**
     * Return the parameter name if it exists in the given parameters.
     *
     * @param  string $name
     * @param  array $parameters
     * @return string|null
     */
    protected static function getParameterName($name, $parameters)
    {
        if (array_key_exists($name, $parameters)) {
            return $name;
        }

        if (array_key_exists($snakedName = Str::snake($name), $parameters)) {
            return $snakedName;
        }
    }
}

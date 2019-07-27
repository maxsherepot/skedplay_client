<?php

namespace Modules\Api\GraphQL\Directives;

use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Support\Contracts\ArgBuilderDirective;

class WhereHasDirective extends BaseDirective implements ArgBuilderDirective
{

    /**
     * Name of the directive.
     *
     * @return string
     */
    public function name(): string
    {
        return 'whereHas';
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder $builder
     * @param mixed $value
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder
     */
    public function handleBuilder($builder, $value)
    {
        $key = $this->directiveArgValue('key', 'id');
        $method = $this->directiveArgValue('method', 'where');
        $relationship = $this->directiveArgValue('relationship', $this->definitionNode->name->value);

        return $builder->whereHas($relationship, function ($builder) use ($key, $value, $method) {
            return $builder
                ->$method(
                    $key,
                    $value
                );
        });
    }

    /**
     * Does this filter combine the values of multiple input arguments into one query?
     *
     * This is true for filter directives such as "whereBetween" that expects two
     * different input values, given as separate arguments.
     *
     * @return bool
     */
    public function combinesMultipleArguments(): bool
    {
        return false;
    }
}
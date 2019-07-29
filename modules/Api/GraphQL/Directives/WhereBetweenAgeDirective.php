<?php

namespace Modules\Api\GraphQL\Directives;

use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Support\Contracts\ArgBuilderDirective;

class WhereBetweenAgeDirective extends BaseDirective implements ArgBuilderDirective
{
    /**
     * Name of the directive.
     *
     * @return string
     */
    public function name(): string
    {
        return 'whereBetweenAge';
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder $builder
     * @param mixed $value
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder
     */
    public function handleBuilder($builder, $value)
    {
        $minAge = $value['from'];
        $maxAge = $value['to'];

        if (is_null($maxAge)) {
            $maxAge = $minAge;
        }

        $min = now()->subYears($maxAge + 1)->format('Y-m-d');
        $max = now()->subYears($minAge)->endOfDay()->format('Y-m-d');

        return $builder->whereBetween(
            $this->directiveArgValue('key', 'birthday'),
            [$min, $max]
        );
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
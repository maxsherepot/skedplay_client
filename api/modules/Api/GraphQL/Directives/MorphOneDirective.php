<?php

namespace Modules\Api\GraphQL\Directives;

use Nuwave\Lighthouse\Schema\Directives\RelationDirective;
use Nuwave\Lighthouse\Support\Contracts\FieldResolver;

class MorphOneDirective extends RelationDirective implements FieldResolver
{
    /**
     * Name of the directive.
     *
     * @return string
     */
    public function name(): string
    {
        return 'morphOne';
    }
}

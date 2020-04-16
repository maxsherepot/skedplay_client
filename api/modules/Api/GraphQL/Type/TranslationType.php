<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Type;

use GraphQL\Language\AST\ObjectValueNode;
use GraphQL\Type\Definition\ScalarType;
use GraphQL\Error\Error;

final class TranslationType extends ScalarType
{
    public function serialize($value)
    {
        return $this->parseValue($value);
    }

    public function parseValue($value)
    {
        return json_decode($value, true);
    }

    public function parseLiteral($valueNode, array $variables = null)
    {
        // Note: throwing GraphQL\Error\Error vs \UnexpectedValueException to benefit from GraphQL
        // error location in query:
        if (!$valueNode instanceof ObjectValueNode) {
            throw new Error('Query error: Can only parse objects got: ' . $valueNode->kind, [$valueNode]);
        }

        return $valueNode->value;
    }
}

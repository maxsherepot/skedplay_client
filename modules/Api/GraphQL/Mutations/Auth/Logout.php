<?php

namespace Modules\Api\GraphQL\Mutations\Auth;

use Illuminate\Support\Facades\Auth;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Exceptions\AuthenticationException;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Logout extends BaseAuthResolver
{
    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function resolve($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        if (!Auth::guard('api')->check()) {
            throw new AuthenticationException("Not Authenticated");
        }

        // revoke user's token
        Auth::guard('api')->user()->token()->revoke();

        return [
            'status'  => 'TOKEN_REVOKED',
            'message' => 'Your session has been terminated'
        ];
    }
}
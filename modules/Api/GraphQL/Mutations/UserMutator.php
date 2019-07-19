<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Modules\Users\Repositories\UserRepository;
use GraphQL\Type\Definition\ResolveInfo;
use Modules\Users\Entities\User;

class UserMutator extends BaseMutation
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        /**
         * Validate in schema definition
         */
        $data = collect($args['data']);
        dd($data);
    }
}

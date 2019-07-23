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

    /**
     * @var User
     */
    private $user;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->user = request()->user('api');
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): array
    {
        $data = collect($args);
        $result = $this->userRepository->update($this->user, $data);

        return $result ? $this->success() : $this->fail();
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function uploadPhotos($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $this->userRepository->saveAttachments($this->user, $args['files'], 'photos');
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function uploadVideos($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $this->userRepository->saveAttachments($this->user, $args['files'], 'videos');
    }
}

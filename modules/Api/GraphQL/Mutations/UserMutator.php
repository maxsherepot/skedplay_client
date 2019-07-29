<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Modules\Users\Entities\User;
use Modules\Users\Repositories\UserRepository;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

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

    /**
     * @var array
     */
    private $rules;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->user = request()->user('api');
        $this->rules = $this->rules();
    }

    public function rules(): array
    {
        return [
            'first_name'        => 'string|max:255',
            'last_name'         => 'nullable|string|max:255',
            'gender'            => 'nullable|string|max:255',
            'birthday'          => 'nullable|date',
            'club_type'         => 'nullable|string|max:255',
            'phone'             => 'string|max:255|unique:users,phone',
            'email'             => 'string|email|max:255|unique:users,email',
            'password'          => 'string|min:6|confirmed',
            'account_type'      => 'string|max:255|in:' . implode(',', User::REGISTER_TYPES),
            'address'           => 'nullable|string|max:255',
            'type'              => 'required|string|max:255|in:' . implode(',', User::MODEL_TYPES),
            'short_description' => 'nullable|string|max:255',
            'description'       => 'nullable|string',
            'lat'               => 'string|nullable',
            'lng'               => 'string|nullable',
            'vip'               => 'boolean',
        ];
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

        $this->validation($data, $this->rules);
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

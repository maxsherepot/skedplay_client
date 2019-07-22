<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations\Auth;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Modules\Api\GraphQL\Mutations\BaseMutation;
use Modules\Users\Repositories\UserRepository;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Collection;
use Modules\Users\Entities\User;

class Registration extends BaseMutation
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
    public function resolve($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $data = collect($args['data']);
        $this->validation($data, $this->rules());

        event(new Registered($user = $this->create($data)));

        return [
            'access_token' => $this->userRepository->createToken($user),
            'user'         => $user,
        ];
    }

    /**
     * @param Collection $data
     * @return User
     */
    public function create(Collection $data): User
    {
        return $this->userRepository->store($data);
    }

    /**
     * @return array
     */
    protected function rules(): array
    {
        return [
            'first_name' => 'sometimes|string|max:255',
            'last_name'  => 'nullable|string|max:255',
            'gender'     => 'nullable|string|max:255',
            'birthday'   => 'nullable|date',
            'club_type'  => 'nullable|string|max:255',
            'phone'      => 'string|max:255|unique:users,phone',
            'email'     => 'required|string|email|max:255|unique:users,email',
            'password'  => 'required|string|min:6|confirmed',
            'user_type' => 'required|string|max:255|in:' . implode(',', User::REGISTER_TYPES),
            'lat'       => 'string|nullable',
            'lng'       => 'string|nullable',
        ];
    }
}

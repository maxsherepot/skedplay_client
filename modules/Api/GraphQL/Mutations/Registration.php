<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations;

use Joselfonseca\LighthouseGraphQLPassport\Exceptions\ValidationException as GraphQLValidationException;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Validation\ValidationException;
use Modules\Users\Repositories\UserRepository;
use Modules\Users\Http\Requests\UserRequest;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Auth\Events\Registered;
use Modules\Users\Entities\User;

class Registration
{
    use ValidatesRequests;

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
        try {
            $this->validate($args['data'], $this->rules());
        } catch (ValidationException $e) {
            throw new GraphQLValidationException($e->errors(), "Input validation failed");
        }

        event(new Registered($user = $this->create($args['data'])));

        return $this->userRepository->register($user);
    }

    /**
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        return $this->userRepository->store($data);
    }

    /**
     * @return array
     */
    protected function rules(): array
    {
        return (new UserRequest())->rules();
    }

    /**
     * @param array $data
     * @param array $rules
     * @param array $messages
     * @param array $customAttributes
     * @return mixed
     */
    public function validate(array $data, array $rules, array $messages = [], array $customAttributes = [])
    {
        return $this->getValidationFactory()->make($data, $rules, $messages, $customAttributes)->validate();
    }
}

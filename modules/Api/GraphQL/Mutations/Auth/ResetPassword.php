<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations\Auth;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Modules\Users\Services\Verification\Verification;
use Modules\Api\GraphQL\Mutations\BaseMutation;
use Modules\Users\Repositories\UserRepository;
use GraphQL\Type\Definition\ResolveInfo;

class ResetPassword extends BaseMutation
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var Verification
     */
    private $verification;

    /**
     * ForgotPassword constructor.
     * @param UserRepository $userRepository
     * @param Verification $verification
     */
    public function __construct(UserRepository $userRepository, Verification $verification)
    {
        $this->userRepository = $userRepository;
        $this->verification = $verification;
    }

    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return mixed
     * @throws \Exception
     */
    public function resolve($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $data = collect($args['data']);
        $this->validation($data, $this->rules());

        $this->verification->checkCode(
            $data->get('code'),
            $data->get('phone'),
            function () use ($data) {
                $user = $this->userRepository->getByPhone($data->get('phone'));
                $this->userRepository->resetPassword($data->get('password'), $user);
            });

        return $this->verification->response();
    }

    /**
     * @return array
     */
    protected function rules(): array
    {
        return [
            'code'     => 'required',
            'phone'    => 'bail|required|string|max:255|phone:AUTO,US',
            'password' => 'required|confirmed|min:6',
        ];
    }
}

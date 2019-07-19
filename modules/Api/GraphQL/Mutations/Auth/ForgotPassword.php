<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations\Auth;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Modules\Users\Services\Verification\Verification;
use Modules\Api\GraphQL\Mutations\BaseMutation;
use Modules\Users\Repositories\UserRepository;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Log;

class ForgotPassword extends BaseMutation
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

        try {
            $user = $this->userRepository->getByPhone($data->get('phone'));

            if (is_null($user)) {
                throw new \Exception("User with such a phone is not found");
            }

            $code = $this->verification
                ->setUser($user)
                ->getCode($user->phone);

            $this->verification->sendCode(
                'Your verification code: ' . $code,
                $user->phone
            );

        } catch (\Exception $e) {
            Log::info($e->getMessage());
        }

        return $this->verification->response();
    }

    /**
     * @return array
     */
    protected function rules(): array
    {
        return [
            'phone' => 'bail|required|string|max:255|phone:AUTO,US',
        ];
    }
}

<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations\Verification;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Modules\Users\Services\Verification\Verification;
use Modules\Api\GraphQL\Mutations\BaseMutation;
use GraphQL\Type\Definition\ResolveInfo;
use Modules\Users\Entities\User;

class SendVerification extends BaseMutation
{
    /**
     * @var Verification
     */
    private $verification;

    public function __construct(Verification $verification)
    {
        $this->verification = $verification;
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

        $code = $this->verification
            ->setUser(new User([
                'phone' => $phoneNumber = $data->get('phone')
            ]))
            ->getCode($phoneNumber);

        /** Mb callback */
        $this->verification->sendCode(
            'Your register verification code: ' . $code
        );

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

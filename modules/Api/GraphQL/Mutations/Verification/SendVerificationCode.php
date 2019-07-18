<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations\Verification;

use Modules\Users\Services\SmsVerification\SmsVerification;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Modules\Api\GraphQL\Mutations\BaseMutation;
use GraphQL\Type\Definition\ResolveInfo;

class SendVerificationCode extends BaseMutation
{
    /**
     * @var SmsVerification
     */
    private $verification;

    public function __construct(SmsVerification $verification)
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

        return $this->verification->sendCode($data->get('phone'));
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

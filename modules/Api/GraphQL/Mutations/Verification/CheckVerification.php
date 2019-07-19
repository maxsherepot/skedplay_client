<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations\Verification;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Modules\Users\Services\Verification\Verification;
use Modules\Api\GraphQL\Mutations\BaseMutation;
use GraphQL\Type\Definition\ResolveInfo;

class CheckVerification extends BaseMutation
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

        $this->verification->checkCode(
            $data->get('code'),
            $data->get('phone'),
        );

        return $this->verification->response();
    }

    /**
     * @return array
     */
    protected function rules(): array
    {
        return [
            'code'  => 'required|string|max:6',
            'phone' => 'bail|required|string|max:255|phone:AUTO,US',
        ];
    }
}

<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations;

use Joselfonseca\LighthouseGraphQLPassport\Exceptions\ValidationException as GraphQLValidationException;
use Modules\Api\Http\Requests\CheckVerificationCodeRequest;
use Modules\Users\Services\SmsVerification\SmsVerification;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Validation\ValidationException;
use GraphQL\Type\Definition\ResolveInfo;

class CheckVerificationCode
{
    use ValidatesRequests;

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
        try {
            $this->validate($args['data'], $this->rules());
        } catch (ValidationException $e) {
            throw new GraphQLValidationException($e->errors(), "Input validation failed");
        }

        return $this->verification->checkCode($args['data']['code'], $args['data']['phone']);
    }


    /**
     * @return array
     */
    protected function rules(): array
    {
        return (new CheckVerificationCodeRequest())->rules();
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

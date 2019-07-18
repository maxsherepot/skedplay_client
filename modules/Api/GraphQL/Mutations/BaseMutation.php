<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations;

use Joselfonseca\LighthouseGraphQLPassport\Exceptions\ValidationException as GraphQLValidationException;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Collection;

abstract class BaseMutation
{
    use ValidatesRequests;

    /**
     * @param Collection $data
     * @param array $rules
     * @throws GraphQLValidationException
     */
    public function validation(Collection $data, array $rules)
    {
        try {
            $this->validate($data->toArray(), $rules);
        } catch (ValidationException $e) {
            throw new GraphQLValidationException($e->errors(), "Input validation failed");
        }
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
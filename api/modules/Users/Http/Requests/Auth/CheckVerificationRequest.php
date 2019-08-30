<?php

namespace Modules\Users\Http\Requests\Auth;

use Modules\Api\Extensions\GraphQLFormRequest;

class CheckVerificationRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code'  => 'required|string|max:6',
            'phone' => 'bail|required|string|phone:AUTO,CH',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}

<?php

namespace Modules\Users\Http\Requests\Auth;

use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Users\Rules\CaptchaRule;

class LoginRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username'      => 'required',
            'password'      => 'required|max:2',
            'recaptcha'     => ['bail', 'required', 'string', new CaptchaRule],
            'remember_me'   => 'nullable|boolean',
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

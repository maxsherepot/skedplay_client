<?php

namespace Modules\Users\Http\Requests\Auth;

use Modules\Api\Extensions\GraphQLFormRequest;

class ResetPasswordRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code'     => 'required',
            'phone'    => 'bail|required|string|max:255|phone:AUTO,US',
            'password' => 'required|confirmed|min:6',
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

<?php

namespace Modules\Users\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Users\Rules\CaptchaRule;

class LoginRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'phone'         => 'required',
            'password'      => 'required',
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

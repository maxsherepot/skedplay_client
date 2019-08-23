<?php

namespace Modules\Users\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Users\Rules\CaptchaRule;

class SendVerificationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {        
        return [
            'phone'        => 'bail|required|string|max:255|phone:AUTO,US',
            'recaptcha'    => ['bail', 'required', 'string', new CaptchaRule],
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

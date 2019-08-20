<?php

namespace Modules\Users\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class CheckVerificationRequest extends FormRequest
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
            'phone' => 'bail|required|string|max:255|phone:AUTO,US',
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

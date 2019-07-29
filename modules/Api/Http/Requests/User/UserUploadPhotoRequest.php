<?php

namespace Modules\Api\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserUploadPhotoRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'required',
            'file',
            'mimes:jpeg,jpg,png',
            'max:4000',
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

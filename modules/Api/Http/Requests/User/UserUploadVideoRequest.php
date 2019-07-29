<?php

namespace Modules\Api\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserUploadVideoRequest extends FormRequest
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
            'mimetypes:video/avi,video/mpeg,video/quicktime',
            'max:100040'
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

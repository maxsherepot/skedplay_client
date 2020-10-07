<?php

namespace Modules\Api\Http\Requests\Common;

use Illuminate\Foundation\Http\FormRequest;

class SubscribeEmployeeCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'     => 'required|email|string',
            'employee_id'   => 'required|integer',
            'locale'   => 'required|string',
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

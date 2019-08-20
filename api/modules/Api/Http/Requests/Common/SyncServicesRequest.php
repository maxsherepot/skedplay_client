<?php

namespace Modules\Api\Http\Requests\Common;

use Illuminate\Foundation\Http\FormRequest;

class SyncServicesRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'services'         => 'required',
            'services.*.id'    => 'bail|required|numeric|exists:services,id',
            'services.*.price' => 'bail|required|numeric',
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

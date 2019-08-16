<?php

namespace Modules\Api\Http\Requests\Billing;

use Illuminate\Foundation\Http\FormRequest;

class CompletedRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'invoice' => 'bail|required|numeric|exists:invoices,id',
            'token'   => 'required|string',
            'payerId' => 'required|string',
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

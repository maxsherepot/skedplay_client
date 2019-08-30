<?php

namespace Modules\Billing\Http\Requests;

use \Modules\Api\Extensions\GraphQLFormRequest;

class CompletedRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'transaction' => 'bail|required|numeric|exists:transactions,id',
            'token'       => 'required|string',
            'payerId'     => 'required|string',
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

<?php

namespace Modules\Api\Http\Requests\Common;

use \Modules\Api\Extensions\GraphQLFormRequest;

class SyncPricesRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'prices'         => 'required',
            'prices.*.id'    => 'bail|required|numeric|exists:services,id',
            'prices.*.price' => 'bail|required|numeric',
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
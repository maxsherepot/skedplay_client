<?php

namespace Modules\Api\Http\Requests\Common;

use \Modules\Api\Extensions\GraphQLFormRequest;

class SubscribeClubCreateRequest extends GraphQLFormRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'email'     => 'required|email|string',
            'club_id'   => 'required|integer',
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

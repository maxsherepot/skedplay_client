<?php

namespace Modules\Api\Http\Requests\Club;

use \Modules\Api\Extensions\GraphQLFormRequest;

class ClubCreateRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'                    => 'required|string|max:255',
            'club_type_id'            => 'bail|required|integer|exists:club_types,id',
            'email'                   => 'nullable|email',
            'website'                 => 'nullable|string|max:255',
            'phones'                  => 'nullable',
            'phones.*'                => 'string',
            'description'             => 'required|string',
            'address'                 => 'nullable|string|max:255',
            'moderator.first_name'    => 'required|string|max:255',
            'moderator.last_name'     => 'nullable|string|max:255',
            'moderator.email'         => 'bail|required|unique:users,email',
            'moderator.phone'         => 'bail|required|unique:users,phone',
            'lat'                     => 'nullable|string',
            'lng'                     => 'nullable|string',
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

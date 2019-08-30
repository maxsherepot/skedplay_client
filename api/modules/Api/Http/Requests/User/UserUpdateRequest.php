<?php

namespace Modules\Api\Http\Requests\User;

use \Modules\Api\Extensions\GraphQLFormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'        => 'string|max:255',
            'last_name'         => 'nullable|string|max:255',
            'phone'             => [
                'bail',
                'required',
                'string',
                'max:255',
                Rule::unique('users', 'phone')->ignore($this->user)
            ],
            'email'             => [
                'bail',
                'required',
                'string',
                'email',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->user)
            ],
            'password'          => 'string|min:6|confirmed',
            'address'           => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:255',
            'description'       => 'nullable|string',
            'lat'               => 'nullable|string',
            'lng'               => 'nullable|string',
            'vip'               => 'boolean',
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

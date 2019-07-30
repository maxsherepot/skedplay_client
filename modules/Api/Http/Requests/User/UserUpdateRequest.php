<?php

namespace Modules\Api\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Users\Entities\Girl;
use Modules\Users\Entities\User;

class UserUpdateRequest extends FormRequest
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
            'gender'            => 'nullable|string|max:255',
            'birthday'          => 'nullable|date',
            'club_type'         => 'nullable|string|max:255',
            'phone'             => 'sometimes|string|max:255|unique:users,phone',
            'email'             => 'sometimes|string|email|max:255|unique:users,email',
            'password'          => 'string|min:6|confirmed',
            'account_type'      => 'string|max:255|in:' . implode(',', User::REGISTER_TYPES),
            'address'           => 'nullable|string|max:255',
            'type'              => 'string|max:255|in:' . implode(',', Girl::GIRL_TYPES),
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

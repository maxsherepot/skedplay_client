<?php

namespace Modules\Users\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Users\Entities\User;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'sometimes|string|max:255',
            'last_name'  => 'nullable|string|max:255',
            'gender'     => 'nullable|string|max:255',
            'birthday'   => 'nullable|date',
            'club_type'  => 'nullable|string|max:255',
            'phone'      => 'string|max:255|unique:users,phone',
            'email'      => 'required|string|email|max:255|unique:users,email',
            'password'   => 'required|string|min:6|confirmed',
            'user_type'  => 'required|string|max:255|in:' . implode(',', User::REGISTER_TYPES),
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
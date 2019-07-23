<?php

namespace Modules\Api\GraphQL\Directives;

use Nuwave\Lighthouse\Schema\Directives\ValidationDirective;
use Modules\Users\Entities\User;

class UpdateUserValidationDirective extends ValidationDirective
{
    /**
     * Name of the directive.
     *
     * @return string
     */
    public function name(): string
    {
        return 'updateUserValidation';
    }

    /**
     * @return mixed[]
     */
    public function rules(): array
    {
        return [
            'id'         => 'required',
            'first_name' => 'string|max:255',
            'last_name'  => 'nullable|string|max:255',
            'gender'     => 'nullable|string|max:255',
            'birthday'   => 'nullable|date',
            'club_type'  => 'nullable|string|max:255',
            'phone'      => 'string|max:255|unique:users,phone',
            'email'      => 'string|email|max:255|unique:users,email',
            'password'   => 'string|min:6|confirmed',
            'user_type'  => 'string|max:255|in:' . implode(',', User::REGISTER_TYPES),
            'lat'        => 'string|nullable',
            'lng'        => 'string|nullable',
        ];
    }
}
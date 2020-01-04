<?php

namespace Modules\Users\Http\Requests\Auth;

use Carbon\Carbon;
use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Users\Entities\User;
use Modules\Users\Rules\CaptchaRule;

class RegistrationRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $root = [
//            'recaptcha'    => ['bail', 'required', 'string', new CaptchaRule],
            // 'plan_id'      => 'bail|nullable|numeric|exists:plans,id',
            'account_type' => 'required|string|max:255|in:' . implode(',', User::REGISTER_TYPES),
            'first_name'   => 'required|string|max:255',
            'last_name'    => 'nullable|string|max:255',
            'phone'        => 'bail|required|string|unique:users,phone|phone:AUTO,CH',
            'email'        => 'bail|required|email|max:255|unique:users,email',
            'password'     => 'required|string|min:6|confirmed',
        ];

        switch ($this->request->get('account_type')) {
            case User::ACCOUNT_CLUB_OWNER:
                $root = array_merge($root, [
                    // 'club_type' => 'required|string|max:255',
                ]);
                break;
            case User::ACCOUNT_CLIENT:
            case User::ACCOUNT_EMPLOYEE:
                $root = array_merge($root, [
                    // 'gender'   => 'required|numeric|in:' . implode(',', User::REGISTER_GENDERS),
                    'birthday'     => [
                        'required',
                        'date',
                        'after:' . now()->subYears(60)->startOfDay(),
                        'before:' . now()->subYears(18)->startOfDay(),
                    ],
                    'lat' => 'nullable|string',
                    'lng' => 'nullable|string',
                ]);
                break;
        }

        return $root;
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

    public function messages()
    {
        return array_merge(parent::messages(), [
            'birthday.after' => 'Your age must be between 18 and 60.',
            'birthday.before' => 'Your age must be between 18 and 60.',
        ]);
    }
}

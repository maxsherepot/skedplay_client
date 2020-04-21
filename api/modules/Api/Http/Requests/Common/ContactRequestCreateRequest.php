<?php

namespace Modules\Api\Http\Requests\Common;

use \Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Users\Rules\CaptchaRule;

class ContactRequestCreateRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules =  [
            'theme' => ['required', 'string', 'max:255'],
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:3000'],
        ];

        if (!auth('api')->check()) {
            $rules['recaptcha'] = ['bail', 'required', 'string', new CaptchaRule];
        }

        return $rules;
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

<?php

namespace Modules\Api\Http\Requests\Review;

use \Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Users\Rules\CaptchaRule;

class ReviewCreateRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'     => 'email',
            'title'     => 'required|string|max:255',
            'body'      => 'required|string',
            'recaptcha' => ['bail', 'required', 'string', new CaptchaRule],

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

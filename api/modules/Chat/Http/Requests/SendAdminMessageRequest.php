<?php

namespace Modules\Chat\Http\Requests;

use Modules\Api\Extensions\GraphQLFormRequest;

class SendAdminMessageRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'chat_id' => ['required', 'integer'],
//            'user_id' => ['required', 'integer', 'exists:users,id'],
            'text' => ['nullable', 'max:1000'],
            'attachments' => ['array', 'max:10'],
            'attachments.*' => ['required', 'image', 'max:10240'],
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

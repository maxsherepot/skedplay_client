<?php

namespace Modules\Api\Http\Requests\Event;

use \Modules\Api\Extensions\GraphQLFormRequest;

class EventUpdateRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'         => 'string|max:255',
            'description'   => 'string',
            'event_type_id' => 'sometimes|numeric|exists:events,id',
            'club_id'       => 'sometimes|nullable|numeric|exists:clubs,id',
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

<?php

namespace Modules\Api\Http\Requests\Event;

use Illuminate\Validation\Rule;
use \Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Events\Entities\Event;

class EventCreateRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'event_type_id' => 'bail|required|numeric|exists:events,id',
            'club_id'       => 'bail|nullable|numeric|exists:clubs,id',
            'address'       => 'string|max:255',
            'mode' => ['required', Rule::in(array_keys(Event::MODES))],
            'employees_ids' => 'nullable|array',
            'employees_ids.*' => 'integer',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'days' => 'nullable|array',
            'days.*' => 'integer',
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

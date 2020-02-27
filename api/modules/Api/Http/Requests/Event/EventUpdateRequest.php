<?php

namespace Modules\Api\Http\Requests\Event;

use Illuminate\Validation\Rule;
use \Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Events\Entities\Event;

class EventUpdateRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'title'         => 'string|max:255',
            'description'   => 'string',
            'event_type_id' => 'sometimes|numeric|exists:events,id',
            'club_id'       => 'sometimes|nullable|numeric|exists:clubs,id',
            'address'       => 'string|max:255',
            'mode' => ['required', Rule::in(array_keys(Event::MODES))],
            'employees_ids' => ['required_with:club_id', 'array'],
            'employees_ids.*' => 'integer',
            'end_date' => 'nullable|date',
        ];

        if (intval($this->get('mode')) === Event::MODE_REGULAR) {
            $rules['days'] = ['required', 'array', 'min:1'];
            $rules['days.*'] = ['integer'];
        } elseif (intval($this->get('mode')) === Event::MODE_DATE) {
            $rules['start_date'] = ['required', 'date'];
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

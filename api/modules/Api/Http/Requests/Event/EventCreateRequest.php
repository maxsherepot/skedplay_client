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
        $rules = [
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'event_type_id' => 'bail|required|integer|exists:event_types,id',
            'club_id'       => 'bail|nullable|integer|exists:clubs,id',
            'address'       => 'string|max:255',
            'mode' => ['required', Rule::in(array_keys(Event::MODES))],
            'employees_ids' => ['required', 'array'],
            'employees_ids.*' => 'integer',
            'end_date' => 'nullable|date',
        ];

        if (intval($this->get('mode')) === Event::MODE_REGULAR) {
            $rules['days'] = ['required', 'array', 'min:1'];
            $rules['days.*'] = ['integer'];
        } elseif (intval($this->get('mode')) === Event::MODE_DATE) {
            $rules['start_date'] = ['required', 'date'];
        }

        if (!$this->get('club_id')) {
            $rules['employees_ids'][] = 'min:1';
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

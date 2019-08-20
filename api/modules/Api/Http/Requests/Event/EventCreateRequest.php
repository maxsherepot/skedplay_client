<?php

namespace Modules\Api\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class EventCreateRequest extends FormRequest
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
            'club_id'       => 'bail|required|numeric|exists:clubs,id',
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

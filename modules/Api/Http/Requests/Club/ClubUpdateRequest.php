<?php

namespace Modules\Api\Http\Requests\Club;

use Illuminate\Foundation\Http\FormRequest;

class ClubUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'        => 'required|string|max:255',
            'type'        => 'required|string|max:255',
            'address'     => 'required|string|max:255',
            'website'     => 'nullable|string|max:255',
            'phone'       => 'required|string',
            'description' => 'required|string',
            'lat'         => 'nullable|string',
            'lng'         => 'nullable|string',
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

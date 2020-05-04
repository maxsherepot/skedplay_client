<?php

namespace Modules\Api\Http\Requests\Employee;

use \Modules\Api\Extensions\GraphQLFormRequest;

class EmployeeUpdateCurrentPositionRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'club_id'   => ['nullable', 'exists:clubs,id'],
            'address'   => ['nullable', 'string', 'max:255'],
            'save_for_current_day'   => ['boolean'],
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

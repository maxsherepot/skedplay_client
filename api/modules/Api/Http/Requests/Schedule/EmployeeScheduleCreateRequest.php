<?php

namespace Modules\Api\Http\Requests\Schedule;

use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;
use \Modules\Api\Extensions\GraphQLFormRequest;

class EmployeeScheduleCreateRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'input.schedules.*.day'         => [
                'required',
                Rule::unique('employee_schedule_work')->where(function (Builder $query) {
                    return $query->where('day', $this->request->get('day'))
                        ->where('employee_id', $this->request->get('employee_id'));
                })
            ],
            'input.schedules.*.start'       => 'nullable|string',
            'input.schedules.*.end'         => 'nullable|string',
            'input.schedules.*.available'   => 'bool',
            'input.schedules.*.employee_id' => 'bail|required',
            'input.schedules.*.club_id'     => 'nullable',
            'input.will_activate_at'     => 'nullable|date',
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

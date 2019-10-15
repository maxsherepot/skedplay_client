<?php

namespace Modules\Api\Http\Requests\Schedule;

use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;
use \Modules\Api\Extensions\GraphQLFormRequest;

class ClubScheduleUpdateRequest extends GraphQLFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'input.*.day'       => [
                'required',
                Rule::unique('club_schedule_work')->where(function (Builder $query) {
                    return $query->where('day', $this->request->get('day'))
                        ->where('club_id', $this->request->get('club_id'));
                })
            ],
            'input.*.start'     => 'nullable|string',
            'input.*.end'       => 'nullable|string',
            'input.*.available' => 'bool',
            'input.*.club_id'   => 'bail|required|integer',
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

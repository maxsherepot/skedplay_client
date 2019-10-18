<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Modules\Employees\Services\ParameterOption;

class EmployeeParameter extends Pivot
{
    public $timestamps = false;

    protected $fillable = [
        'employee_id',
        'parameter_id',
        'value',
    ];

    protected $appends = [
        'display_value',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parameter()
    {
        return $this->belongsTo(Parameter::class);
    }

    public function getDisplayValueAttribute()
    {
        return (new ParameterOption())->getTranslation($this->parameter->name, $this->attributes['value']);
    }
}

<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Employees\Entities\ParameterAllLangs;
use Modules\Employees\Entities\ParameterOptionAllLangs;

class EmployeeParameter extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'employee_id',
        'parameter_id',
        'parameter_option_id',
    ];

    public function parameter(): BelongsTo
    {
        return $this->belongsTo(ParameterAllLangs::class);
    }

    public function parameterOption(): BelongsTo
    {
        return $this->belongsTo(ParameterOptionAllLangs::class);
    }
}

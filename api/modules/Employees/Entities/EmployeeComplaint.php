<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeComplaint extends Model
{
    protected $fillable = ['name', 'email', 'message', 'theme_id', 'employee_id'];

    public function theme(): BelongsTo
    {
        return $this->belongsTo(EmployeeComplaintTheme::class);
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}

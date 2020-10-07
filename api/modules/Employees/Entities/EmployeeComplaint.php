<?php

namespace Modules\Employees\Entities;

use App\Models\ViewedEntity;
use App\Models\ViewedEntityDefault;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeComplaint extends Model implements ViewedEntity
{
    use ViewedEntityDefault;

    protected $fillable = ['name', 'email', 'message', 'theme_id', 'employee_id','seen'];

    public function theme(): BelongsTo
    {
        return $this->belongsTo(EmployeeComplaintTheme::class);
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}

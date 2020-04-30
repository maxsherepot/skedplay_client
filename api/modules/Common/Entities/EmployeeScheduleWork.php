<?php declare(strict_types=1);

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\Traits\Schedulable;
use Modules\Employees\Entities\Employee;

class EmployeeScheduleWork extends Model
{
    use Schedulable;

    protected $table = "employee_schedule_work";

    protected $fillable = ['day', 'start', 'end', 'available', 'order', 'employee_id', 'club_id', 'at_address', 'address'];

    /**
     * @return BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * @return BelongsTo
     */
    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }
}

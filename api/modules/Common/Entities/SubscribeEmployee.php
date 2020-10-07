<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Modules\Employees\Entities\Employee;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Contracts\Translation\HasLocalePreference;

class SubscribeEmployee extends Model implements HasLocalePreference
{
    use Notifiable;

    protected $fillable = [
        'email',
        'employee_id',
        'locale'
    ];

    /**
     * @return BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function preferredLocale()
    {
        return $this->locale ?? 'en';
    }
}

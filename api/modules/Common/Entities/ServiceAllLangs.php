<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Modules\Employees\Entities\Employee;

class ServiceAllLangs extends Model
{
    protected $table = 'services';

    public $timestamps = false;

    protected $appends = ['slug'];

    public function employees()
    {
        return $this->morphToMany(Employee::class, 'serviceable')->withPivot('price');
    }

    /**
     * @return BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(GroupService::class,  'group_id');
    }

    public function getSlugAttribute(): string
    {
        $translates = json_decode($this->name, true);

        return Str::slug($translates['en'] ?? $translates['de'] ?? $translates['fr']);
    }
}

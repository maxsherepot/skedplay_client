<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

/**
 * @property int id
 * @property string name
 */
class City extends Model
{
    protected $fillable = ['name', 'canton_id'];

    protected $appends = ['slug'];

    public function canton(): BelongsTo
    {
        return $this->belongsTo(Canton::class);
    }

    public function getSlugAttribute(): string
    {
        return Str::slug($this->name);
    }
}

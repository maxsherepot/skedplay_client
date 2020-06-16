<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Canton extends Model
{
    protected $fillable = ['name'];

    protected $appends = ['slug'];

    public function cities(): HasMany
    {
        return $this->hasMany(City::class);
    }

    public function getSlugAttribute(): string
    {
        return Str::slug($this->name);
    }
}

<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Language extends Model
{
    protected $fillable = [
        'name',
        'code',
        'active',
    ];

    protected $appends = [
        'url_prefix'
    ];

    public function uiTranslates(): HasMany
    {
        return $this->hasMany(UiTranslate::class);
    }

    public function getUrlPrefixAttribute(): string
    {
        return $this->code === 'de'
            ? ''
            : '/' . $this->code;
    }
}

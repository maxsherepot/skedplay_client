<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Translatable\HasTranslations;

class ParameterOption extends Model
{
    use HasTranslations;

    public $translatable = [
        'value',
    ];

    protected $fillable = [
        'parameter_id',
        'value',
    ];

    /**
     * @return BelongsTo
     */
    public function parameter(): BelongsTo
    {
        return $this->belongsTo(Parameter::class, 'parameter_id');
    }

    public function getAttributeValue($key)
    {
        if (! $this->isTranslatableAttribute($key)) {
            return parent::getAttributeValue($key);
        }

        return $this->getTranslations($key);
    }
}

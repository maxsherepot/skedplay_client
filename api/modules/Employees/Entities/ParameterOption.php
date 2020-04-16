<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
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

    public function getAttributeValue($key)
    {
        if (! $this->isTranslatableAttribute($key)) {
            return parent::getAttributeValue($key);
        }

        return $this->getTranslations($key);
    }
}

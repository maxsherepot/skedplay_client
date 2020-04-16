<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Parameter extends Model
{
    use HasTranslations;

    public $translatable = [
        'name',
    ];

    protected $fillable = [
        'name',
    ];

    const HAIR_BLACK = 'Black';
    const HAIR_WHITE = 'White';

    const EYE_GREEN = 'Green';
    const EYE_BLUE = 'Blue';

    const GROWTH_120 = 120;
    const GROWTH_130 = 130;
    const GROWTH_140 = 140;
    const GROWTH_150 = 150;
    const GROWTH_160 = 160;

    const WEIGHT_40 = 40;
    const WEIGHT_50 = 50;
    const WEIGHT_60 = 60;
    const WEIGHT_70 = 70;
    const WEIGHT_80 = 80;

    const BREAST_SIZE_1 = 1;
    const BREAST_SIZE_2 = 2;
    const BREAST_SIZE_3 = 3;
    const BREAST_SIZE_4 = 4;
    const BREAST_SIZE_5 = 5;

    const BODY_FITNESS = 'Fitness';

    const HAIR_OPTIONS = [
        self::HAIR_BLACK,
        self::HAIR_WHITE,
    ];

    const EYE_OPTIONS = [
        self::EYE_GREEN,
        self::EYE_BLUE,
    ];

    const GROWTH_OPTIONS = [
        self::GROWTH_120,
        self::GROWTH_130,
        self::GROWTH_140,
        self::GROWTH_150,
        self::GROWTH_160,
    ];

    const WEIGHT_OPTIONS = [
        self::WEIGHT_40,
        self::WEIGHT_50,
        self::WEIGHT_60,
        self::WEIGHT_70,
        self::WEIGHT_80,
    ];

    const BREAST_SIZE_OPTIONS = [
        self::BREAST_SIZE_1,
        self::BREAST_SIZE_2,
        self::BREAST_SIZE_3,
        self::BREAST_SIZE_4,
        self::BREAST_SIZE_5,
    ];

    const BODY_OPTIONS = [
        self::BODY_FITNESS,
    ];

    public function options(): HasMany
    {
        return $this->hasMany(ParameterOption::class);
    }

    public function getAttributeValue($key)
    {
        if (! $this->isTranslatableAttribute($key)) {
            return parent::getAttributeValue($key);
        }

        return $this->getTranslations($key);
    }
}

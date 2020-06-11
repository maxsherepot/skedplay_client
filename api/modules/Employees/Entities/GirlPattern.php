<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class GirlPattern extends Model
{
    use HasTranslations;

    protected $fillable = ['type', 'value_with_city', 'value_without_city'];

    public $translatable = ['value_with_city', 'value_without_city'];
}

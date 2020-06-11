<?php

namespace Modules\Clubs\Entities;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class ClubPattern extends Model
{
    use HasTranslations;

    protected $fillable = ['type', 'value_with_city', 'value_without_city'];

    public $translatable = ['value_with_city', 'value_without_city'];
}

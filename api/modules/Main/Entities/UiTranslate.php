<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;

class UiTranslate extends Model
{
    protected $fillable = [
        'language_id',
        'key',
        'value',
    ];
}

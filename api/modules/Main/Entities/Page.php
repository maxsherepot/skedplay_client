<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Main\Services\Translations\Translatable;

class Page extends Model
{
    use Translatable, SoftDeletes;

    const MORPH_TYPE = 'page';

    public $translatable = ['name', 'description'];

    protected $fillable = [
        'name',
        'description',
    ];
}

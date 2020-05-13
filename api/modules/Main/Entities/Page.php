<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Page extends Model
{
    use HasTranslations;

    public $translatable = ['title', 'header', 'description', 'keywords'];

    protected $fillable = [
        'key', 'title', 'header', 'description', 'keywords'
    ];
}

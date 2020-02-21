<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;

class HelpCenterCategory extends Model
{
    use HasTranslations;

    protected $fillable = [];

    public $translatable = ['name'];

    public static function boot()
    {
        parent::boot();

        static::saving(function(self $model) {
            $model->slug = Str::slug($model->name);
        });
    }
}

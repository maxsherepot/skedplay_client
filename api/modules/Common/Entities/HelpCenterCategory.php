<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Kalnoy\Nestedset\NodeTrait;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Translatable\HasTranslations;

class HelpCenterCategory extends Model implements Sortable
{
    use HasTranslations, NodeTrait, SortableTrait;

    public $sortable = [
        'order_column_name' => 'sort_order',
        'sort_when_creating' => true,
    ];

    protected $guarded = [];

    public $translatable = ['name'];

    public static function boot()
    {
        parent::boot();

        static::saving(function(self $model) {
            $model->slug = Str::slug($model->name);
        });
    }

    public function topics()
    {
        return $this->hasMany(HelpCenterTopic::class, 'category_id');
    }
}

<?php

namespace Modules\Common\Entities;

use Advoor\NovaEditorJs\NovaEditorJs;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Translatable\HasTranslations;

class HelpCenterTopic extends Model implements Sortable
{
    use HasTranslations, SortableTrait;

    public $sortable = [
        'order_column_name' => 'sort_order',
        'sort_when_creating' => true,
    ];

    protected $guarded = [];

    public $translatable = ['name', 'content'];

    protected $appends = [
        'content_html'
    ];

    public static function boot()
    {
        parent::boot();

        static::saving(function(self $model) {
            $model->slug = Str::slug($model->name);
        });
    }

    public function getContentHtmlAttribute(): array
    {
        return collect($this->content)->map(function($content) {
            return NovaEditorJs::generateHtmlOutput($content);
        })->toArray();
    }

    public function category()
    {
        return $this->belongsTo(HelpCenterCategory::class, 'category_id');
    }
}

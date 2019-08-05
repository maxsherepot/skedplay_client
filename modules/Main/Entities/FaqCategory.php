<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Main\Services\Translations\Translatable;

class FaqCategory extends Model
{
    use Translatable, SoftDeletes;

    const MORPH_TYPE = 'faq_category';

    public $translatable = ['name'];

    protected $fillable = ['name', 'faq_id'];

    /**
     * @return HasMany
     */
    public function items(): HasMany
    {
        return $this->hasMany(Faq::class);
    }
}

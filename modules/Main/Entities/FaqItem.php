<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Main\Services\Translations\Translatable;

class FaqItem extends Model
{
    use Translatable, SoftDeletes;

    const MORPH_TYPE = 'faq_item';

    public $translatable = ['title', 'text'];

    protected $fillable = ['title', 'text', 'faq_category_id'];

}

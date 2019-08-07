<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Main\Services\Translations\Translatable;

class Faq extends Model
{
    use Translatable, SoftDeletes;

    protected $table = 'faq';

    const MORPH_TYPE = 'faq';

    public $translatable = ['name'];

    protected $fillable = [
        'name',
    ];

    /**
     * @return HasMany
     */
    public function items()
    {
        return $this->hasMany(FaqItem::class);
    }
}

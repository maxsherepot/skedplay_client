<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    protected $table = 'translates';

    protected $fillable = [
        'key',
        'value',
        'locale',
    ];

    /**
     * Get all of the owning entity.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function entity()
    {
        return $this->morphTo();
    }
}

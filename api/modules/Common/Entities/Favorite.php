<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $table = 'favoriteables';

    public $timestamps = true;

    protected $fillable = ['favoriteable_id', 'favoriteable_type', 'user_id'];

    public function favoriteable()
    {
        return $this->morphTo();
    }
}

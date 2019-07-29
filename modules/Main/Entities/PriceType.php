<?php declare(strict_types=1);

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class PriceType extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name'
    ];

    /**
     * Set the price type's name in slug format.
     *
     * @param string $value
     * @return void
     */
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = Str::slug($value);
    }
}

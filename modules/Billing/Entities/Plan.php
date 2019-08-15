<?php declare(strict_types=1);

namespace Modules\Billing\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\Traits\NameSlugable;

class Plan extends Model
{
    use NameSlugable;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    protected $fillable = [
        'price',
        'description',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at', 'updated_at',
    ];
}

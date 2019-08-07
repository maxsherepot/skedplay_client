<?php

namespace Modules\Girls\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\Traits\Priceable;
use Modules\Common\Entities\Traits\Serviceable;
use Modules\Common\Services\Location\HasLocation;
use Modules\Common\Services\Location\Locationable;
use Modules\Events\Entities\Event;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Girl extends Model implements HasMedia, HasLocation
{

    use Locationable, HasMediaTrait, Priceable, Serviceable;

    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'slug',
        'age',
        'girl_type_id',
        'description',
        'text'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(GirlType::class, 'girl_type_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function owner()
    {
        return $this->morphTo();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function events()
    {
        return $this->morphMany(Event::class, 'eventable');
    }
}

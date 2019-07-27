<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model implements HasMedia
{
    use SoftDeletes, HasMediaTrait;

    protected $fillable = [
        'title',
        'description',
        'event_type_id',
    ];

    public function registerMediaCollections()
    {
        $this->addMediaCollection('main_photo');
    }

    /**
     * @return MorphTo
     */
    public function eventable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return BelongsTo
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(EventType::class, 'event_type_id');
    }
}

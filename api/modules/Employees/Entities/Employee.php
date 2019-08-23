<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Modules\Common\Entities\Traits\Priceable;
use Modules\Common\Entities\Traits\Serviceable;
use Modules\Common\Services\Location\HasLocation;
use Modules\Common\Services\Location\Locationable;
use Modules\Events\Entities\Event;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Employee extends Model implements HasMedia, HasLocation
{
    use Locationable, HasMediaTrait, Priceable, Serviceable;

    const PHOTO_COLLECTION = 'employee-photo';
    const VIDEO_COLLECTION = 'employee-video';

    const TYPE_GIRL = 1;
    const TYPE_BOY = 2;
    const TYPE_COUPLE = 3;

    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'slug',
        'age',
        'type',
        'race_type_id',
        'description',
        'text'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function race_type(): BelongsTo
    {
        return $this->belongsTo(EmployeeRaceType::class, 'race_type_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function owner()
    {
        return $this->morphTo();
    }

    /**
     * @return MorphMany
     */
    public function events(): MorphMany
    {
        return $this->morphMany(Event::class, 'owner');
    }

    /**
     * @return HasMany
     */
    public function photos(): HasMany
    {
        return $this->hasMany(Media::class, 'model_id', 'id')
            ->where('collection_name', self::PHOTO_COLLECTION);
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection(self::PHOTO_COLLECTION);
        $this->addMediaCollection(self::VIDEO_COLLECTION);
    }

    /**
     * @param Media|null $media
     * @throws \Spatie\Image\Exceptions\InvalidManipulation
     */
    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('thumb')
            ->height(470)
            ->performOnCollections(self::PHOTO_COLLECTION);
    }
}

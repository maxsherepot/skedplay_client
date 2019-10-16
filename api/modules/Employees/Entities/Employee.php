<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\Review;
use Modules\Common\Entities\Traits\Favoriteable;
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
    use Locationable, HasMediaTrait, Priceable, Serviceable, Favoriteable;

    const PHOTO_COLLECTION = 'employee-photo';
    const VIDEO_COLLECTION = 'employee-video';

    const TYPE_GIRL = 1;
    const TYPE_BOY = 2;
    const TYPE_COUPLE = 3;

    const IS_NEW_DAYS = 3;

    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'slug',
        'age',
        'type',
        'race_type_id',
        'description',
        'languages',
        'text',
        'isVip'
    ];

    public function getLanguagesAttribute($value)
    {
        if (empty($value)) {
            return [];
        }

        return json_decode($value, TRUE);
    }

    public function setLanguagesAttribute($value)
    {
        $this->attributes['languages'] = json_encode($value);
    }

    /**
     * @return string
     */
    public function getNameAttribute()
    {
        return implode(' ', [$this->first_name, $this->last_name]);
    }

    /**
     * @return bool
     */
    public function getIsNewAttribute()
    {
        return now()->subDays(self::IS_NEW_DAYS) < $this->created_at;
    }

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
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
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

    /**
     * @return BelongsToMany
     */
    public function parameters(): BelongsToMany
    {
        return $this->belongsToMany(Parameter::class, 'employee_parameters')->withPivot('value');
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

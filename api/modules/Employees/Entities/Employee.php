<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'text',
        'isVip'
    ];

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
    public function events()
    {
        return $this->morphMany(Event::class, 'owner');
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection(self::PHOTO_COLLECTION);
        $this->addMediaCollection(self::VIDEO_COLLECTION);
    }

    public function registerMediaConversions(Media $media = null)
    {
//        $this->addMediaConversion('small')
//            ->width(160)
//            ->height(220);
//
//        $this->addMediaConversion('medium')
//            ->width(330)
//            ->height(460);
//
//        $this->addMediaConversion('large')
//            ->width(535)
//            ->height(785);
    }
}

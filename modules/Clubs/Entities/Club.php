<?php

namespace Modules\Clubs\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Common\Entities\Traits\Priceable;
use Modules\Common\Entities\Traits\Serviceable;
use Modules\Common\Services\Location\HasLocation;
use Modules\Common\Services\Location\Locationable;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\User;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Club extends Model implements HasMedia, HasLocation, EmployeeOwnerInterface
{
    use Locationable, HasMediaTrait, SoftDeletes, Serviceable, Priceable;

    protected $fillable = [
        'name',
        'slug',
        'club_type_id',
        'website',
        'phones',
        'description',
        'user_id',
    ];

    protected $casts = [
        'phones'
    ];

    public function registerMediaCollections()
    {
        $this->addMediaCollection('logo');
        $this->addMediaCollection('photos');
        $this->addMediaCollection('videos');
    }

    /**
     * @param Media|null $media
     * @throws \Spatie\Image\Exceptions\InvalidManipulation
     */
    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('medium')
            ->width(420)
            ->height(275);

        $this->addMediaConversion('large')
            ->width(535)
            ->height(785);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function employees()
    {
        return $this->morphMany(Employee::class, 'owner');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function type()
    {
        return $this->hasOne(ClubType::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function events()
    {
        return $this->morphMany(Event::class, 'eventable');
    }
}

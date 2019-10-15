<?php

namespace Modules\Clubs\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;
use Modules\Common\Entities\ClubScheduleWork;
use Modules\Common\Entities\Traits\Favoriteable;
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
    use Locationable, HasMediaTrait, SoftDeletes, Serviceable, Priceable, Favoriteable;

    const LOGO_COLLECTION = 'club-logo';

    const PHOTO_COLLECTION = 'club-photo';

    const VIDEO_COLLECTION = 'club-video';

    protected $fillable = [
        'name',
        'slug',
        'club_type_id',
        'email',
        'website',
        'phones',
        'description',
        'address',
        'index',
        'city',
        'user_id',
        'moderator_id',
    ];

    protected $casts = [
        'phones' => 'array',
    ];

    /**
     * @return MorphMany
     */
    public function employees(): MorphMany
    {
        return $this->morphMany(Employee::class, 'owner');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function schedule(): HasMany
    {
        return $this->hasMany(ClubScheduleWork::class)->orderBy('day');
    }

    /**
     * @return HasOne
     */
    public function type(): HasOne
    {
        return $this->hasOne(ClubType::class, 'id', 'club_type_id');
    }

    /**
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return BelongsTo
     */
    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'moderator_id');
    }

    /**
     * @return MorphMany
     */
    public function events(): MorphMany
    {
        return $this->morphMany(Event::class, 'owner');
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection(self::LOGO_COLLECTION)->singleFile();
        $this->addMediaCollection(self::PHOTO_COLLECTION);
        $this->addMediaCollection(self::VIDEO_COLLECTION);
    }

    /**
     * @param Media|null $media
     * @throws \Spatie\Image\Exceptions\InvalidManipulation
     */
    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('thumb')->height(470)->performOnCollections(self::PHOTO_COLLECTION);
    }

    /**
     * @return HasMany
     */
    public function photos(): HasMany
    {
        return $this->hasMany(Media::class, 'model_id', 'id')->where('collection_name', self::PHOTO_COLLECTION);
    }

    /**
     * @return HasMany
     */
    public function videos(): HasMany
    {
        return $this->hasMany(Media::class, 'model_id', 'id')->where('collection_name', self::VIDEO_COLLECTION);
    }

    /**
     * @return HasOne
     */
    public function logo(): HasOne
    {
        return $this->hasOne(Media::class, 'model_id', 'id')->where('collection_name', self::LOGO_COLLECTION);
    }
}

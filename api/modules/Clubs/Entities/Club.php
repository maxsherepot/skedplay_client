<?php

namespace Modules\Clubs\Entities;

use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;
use Modules\Common\Entities\City;
use Modules\Common\Entities\ClubScheduleWork;
use Modules\Common\Entities\Traits\Favoriteable;
use Modules\Common\Entities\Traits\Priceable;
use Modules\Common\Entities\Traits\Serviceable;
use Modules\Common\Services\Location\HasLocation;
use Modules\Common\Services\Location\Locationable;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * Class Club
 * @package Modules\Clubs\Entities
 * @property string name
 * @property string slug
 * @property int club_type_id
 * @property string email
 * @property string website
 * @property string address
 * @property int city_id
 * @property int manager_id
 * @property int moderator_id
 * @property int status
 * @property int user_status
 * @property int id
 * @property datetime manager_assignment_at
 * @property datetime comment_set_at
 * @property string comment
 */
class Club extends Model implements HasMedia, HasLocation, EmployeeOwnerInterface
{
    use Locationable, InteractsWithMedia, SoftDeletes, Serviceable, Priceable, Favoriteable;

    const LOGO_COLLECTION = 'club-logo';

    const PHOTO_COLLECTION = 'club-photo';

    const VIDEO_COLLECTION = 'club-video';

    const STATUS_PENDING = 0;
    const STATUS_CONNECTED = 1;
    const STATUS_REFUSED = 2;
    const STATUS_PROCESSING = 3;

    const STATUSES = [
        self::STATUS_PENDING => 'Pending',
        self::STATUS_CONNECTED => 'Connected',
        self::STATUS_REFUSED => 'Refused',
        self::STATUS_PROCESSING => 'Processing',
    ];

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
        'city_id',
        'user_id',
        'manager_id',
        'moderator_id',
        'moderator_access',
        'start_time',
        'end_time',
        'comment',
    ];

    protected $casts = [
        'phones' => 'array',
        'comment_set_at' => 'datetime',
        'manager_assignment_at' => 'datetime',
    ];

    protected $dates = [
        'created_at'
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
     * @return BelongsTo
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(ClubType::class, 'club_type_id');
    }

    /**
     * @return BelongsTo
     */
    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class, 'city_id');
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
    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
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

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::LOGO_COLLECTION)->singleFile()->useDisk('media');
        $this->addMediaCollection(self::PHOTO_COLLECTION);
        $this->addMediaCollection(self::VIDEO_COLLECTION);
    }

    /**
     * @param Media|null $media
     * @throws \Spatie\Image\Exceptions\InvalidManipulation
     */
    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')->height(340)->width(420)->performOnCollections(self::PHOTO_COLLECTION);
        $this->addMediaConversion('thumb')->height(150)->width(150)->performOnCollections(self::LOGO_COLLECTION);
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
        return $this
            ->hasOne(Media::class, 'model_id', 'id')
            ->where('collection_name', self::LOGO_COLLECTION)
        ;
    }

    public function getCreatedAtDiffAttribute(): string
    {
        return $this->created_at->longAbsoluteDiffForHumans(now());
    }
}

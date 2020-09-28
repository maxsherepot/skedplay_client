<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Collection;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Entities\ChatMember;
use Modules\Chat\Entities\Message;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\City;
use Modules\Common\Entities\EmployeeScheduleWork;
use Modules\Common\Entities\EventCount;
use Modules\Common\Entities\Review;
use Modules\Common\Entities\Traits\Favoriteable;
use Modules\Common\Entities\Traits\Priceable;
use Modules\Common\Entities\Traits\Serviceable;
use Modules\Common\Services\Location\HasLocation;
use Modules\Common\Services\Location\Locationable;
use Modules\Events\Entities\Event;
use Modules\Main\Entities\Language;
use Modules\Main\Medialibrary\Webp;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

/**
 * Class Employee
 * @package Modules\Employees\Entities
 *
 * @property int id
 * @property int inGeneral
 * @property int status
 * @property int user_status
 * @property string rejected_reason
 */
class Employee extends Model implements HasMedia, HasLocation, ChatMember
{
    use Locationable, HasMediaTrait, Priceable, Serviceable, Favoriteable;

    const AVATAR_COLLECTION = 'avatar';
    const PHOTO_COLLECTION = 'employee-photo';
    const VIDEO_COLLECTION = 'employee-video';

    const TYPE_GIRL = 1;
    const TYPE_TRANS = 2;

    const TYPES = [
        self::TYPE_GIRL => 'Girl',
        self::TYPE_TRANS => 'Trans',
    ];

    const IS_NEW_DAYS = 3;

    const SOON_DAYS = 10;
    const SHOW_LEVEL_HIDDEN = 0;
    const SHOW_LEVEL_ACTIVE = 1;
    const SHOW_LEVEL_SOON = 2;

    protected $withCurrentPosition = true;

    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'slug',
        'age',
        'type',
        'race_type_id',
        'city_id',
        'description',
        'languages',
        'text',
        'isVip',
        'inGeneral',
        'will_activate_at',
        'active',
        'soon',
        'show_level',
        'fake',
        'phone',
        'birthday',
        'index',
        'email',
        'website',
        'service_for',
        'current_club_id',
        'current_address',
        'owner_id',
    ];

    protected $dates = [
        'will_activate_at',
        'birthday',
    ];

    protected $appends = [
        'readable_type',
        'name',
    ];

    protected $casts = [
        'service_for' => 'array',
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
        if (!$this->last_name) {
            return $this->first_name;
        }

        return implode(' ', [$this->first_name, $this->last_name]);
    }

    /**
     * @return bool
     */
    public function getIsNewAttribute()
    {
        if ($this->soon) {
            return false;
        }

        return now()->subDays(self::IS_NEW_DAYS) < $this->created_at;
    }

    public function getReadableTypeAttribute()
    {
        return self::TYPES[$this->attributes['type'] ?? null] ?? null;
    }

    public function getCreatedAtDiffAttribute(): string
    {
        return $this->created_at->longAbsoluteDiffForHumans(now());
    }

    /**
     * @return HasMany
     */
    public function schedule(): HasMany
    {
        return $this->hasMany(EmployeeScheduleWork::class)->orderBy('day');
    }

    /**
     * @returnBelongsTo
     */
    public function race_type(): BelongsTo
    {
        return $this->belongsTo(EmployeeRaceType::class, 'race_type_id');
    }

    public function eventCounts()
    {
        return $this->morphMany(EventCount::class, 'model');
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

    public function eventsTakePart(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'event_employee');
    }

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class, 'owner_id');
    }

    public function currentClub(): BelongsTo
    {
        return $this->belongsTo(Club::class, 'current_club_id');
    }

    public function current_club(): BelongsTo
    {
        return $this->currentClub();
    }

    public function avatar(): HasOne
    {
        return $this
            ->hasOne(Media::class, 'model_id', 'id')
            ->where('collection_name', self::AVATAR_COLLECTION);
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
     * @return HasMany
     */
    public function videos(): HasMany
    {
        return $this->hasMany(Media::class, 'model_id', 'id')
            ->where('collection_name', self::VIDEO_COLLECTION);
    }

    public function parameters(): HasMany
    {
        return $this->hasMany(EmployeeParameter::class);
    }

    public function languages(): BelongsToMany
    {
        return $this->belongsToMany(Language::class)->withPivot('stars');
    }

    public function currentCity(): BelongsTo
    {
        return $this->belongsTo(City::class, 'current_city_id');
    }

    public function current_city(): BelongsTo
    {
        return $this->currentCity();
    }

    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class);
    }

    public function unreadMessagesCount(): int
    {
        return Message::query()
            ->select(['messages.*'])
            ->leftJoin('chats', 'chats.id', '=', 'messages.chat_id')
            ->whereFromClient(1)
            ->whereSeen(0)
            ->where('chats.employee_id', $this->id)
            ->count();
    }

    public function userUnreadMessagesCount(): int
    {
        if (!auth()->check()) {
            return 0;
        }

        return Message::query()
            ->select(['messages.*'])
            ->leftJoin('chats', 'chats.id', '=', 'messages.chat_id')
            ->whereFromClient(1)
            ->whereSeen(0)
            ->where('chats.employee_id', $this->id)
            ->where('chats.client_id', auth()->id())
            ->count();
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection(self::AVATAR_COLLECTION)->singleFile();
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
//            ->format('webp')
            ->width(332)
            ->height(470)
            ->performOnCollections(self::PHOTO_COLLECTION);

        $this->addMediaConversion('big_thumb')
//            ->format('webp')
            ->width(454)
            ->height(682)
            ->performOnCollections(self::PHOTO_COLLECTION);

//        $this->addMediaConversion('thumb_blur')
//            ->width(333)
//            ->height(470)
//            ->blur(85)
//            ->performOnCollections(self::PHOTO_COLLECTION);
//
//        $this->addMediaConversion('big_thumb_blur')
//            ->width(455)
//            ->height(682)
//            ->blur(85)
//            ->performOnCollections(self::PHOTO_COLLECTION);
//
//        $this->addMediaConversion('blur')
//            ->width(1800)
//            ->blur(93)
//            ->performOnCollections(self::PHOTO_COLLECTION);
    }

    public function isClient(): bool
    {
        return false;
    }

    public function isEmployee(): bool
    {
        return true;
    }

    public function updateShowLevel(): void
    {
        if ($this->active) {
            $this->show_level = Employee::SHOW_LEVEL_ACTIVE;
        } elseif ($this->soon) {
            $this->show_level = Employee::SHOW_LEVEL_SOON;
        } else {
            $this->show_level = Employee::SHOW_LEVEL_HIDDEN;
        }
    }
}

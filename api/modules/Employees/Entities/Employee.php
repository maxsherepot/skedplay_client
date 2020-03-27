<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Modules\Chat\Entities\ChatMember;
use Modules\Chat\Entities\Message;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\EmployeeScheduleWork;
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

/**
 * Class Employee
 * @package Modules\Employees\Entities
 *
 * @property int id
 * @property int inGeneral
 */
class Employee extends Model implements HasMedia, HasLocation, ChatMember
{
    use Locationable, HasMediaTrait, Priceable, Serviceable, Favoriteable;

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
        'phone',
        'birthday',
        'index',
        'email',
        'website',
    ];

    protected $dates = [
        'will_activate_at',
        'birthday',
    ];

    protected $appends = [
        'readable_type',
        'name',
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

    public function getReadableTypeAttribute(): ?string
    {
        return self::TYPES[$this->attributes['type'] ?? null] ?? null;
    }

    public function getCreatedAtDiffAttribute(): string
    {
        return $this->created_at->longAbsoluteDiffForHumans(now());
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function schedule(): HasMany
    {
        return $this->hasMany(EmployeeScheduleWork::class)->orderBy('day');
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

    public function eventsTakePart(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'event_employee');
    }

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class, 'owner_id');
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

    /**
     * @return BelongsToMany
     */
    public function parameters(): BelongsToMany
    {
        return $this->belongsToMany(Parameter::class, 'employee_parameters')
            ->using(EmployeeParameter::class)
            ->withPivot('value');
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

    public function isClient(): bool
    {
        return false;
    }

    public function isEmployee(): bool
    {
        return true;
    }
}

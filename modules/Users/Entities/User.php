<?php

namespace Modules\Users\Entities;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Laratrust\Traits\LaratrustUserTrait;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\Models\Media;
use Laravel\Passport\HasApiTokens;
use Modules\Main\Entities\Service;
use Modules\Main\Entities\Event;
use Modules\Main\Entities\Price;
use Carbon\Carbon;

class User extends AuthUser implements HasMedia
{
    use HasMediaTrait, HasApiTokens, LaratrustUserTrait, Notifiable;

    use Authorizable {
        Authorizable::can insteadof LaratrustUserTrait;
        LaratrustUserTrait::can as laratrustCan;
    }

    const DEFAULT_LATITUDE = '40.6976701';
    const DEFAULT_LONGITUDE = '-74.259875';

    const ACCOUNT_ADMIN = 'admin';
    const ACCOUNT_CLIENT = 'client';
    const ACCOUNT_MODEL = 'model';
    const ACCOUNT_MODERATOR = 'moderator';
    const ACCOUNT_CLUB_OWNER = 'club_owner';

    const MODEL_EUROPEAN = 1;
    const MODEL_ASIAN = 2;

    const REGISTER_TYPES = [
        self::ACCOUNT_CLIENT,
        self::ACCOUNT_MODEL,
        self::ACCOUNT_CLUB_OWNER
    ];

    const MODEL_TYPES = [
        self::MODEL_EUROPEAN,
        self::MODEL_ASIAN,
    ];

    const GENDER_MALE = 1;
    const GENDER_FEMALE = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'birthday',
        'club_type',
        'phone',
        'email',
        'password',
        'account_type',
        'address',
        'type',
        'short_description',
        'description',
        'lat',
        'lng',
        'vip',
    ];

    protected $appends = [
        'age'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * @return int
     */
    public function getAgeAttribute()
    {
        return Carbon::parse($this->attributes['birthday'])->age;
    }

    /**
     * This mutator automatically hashes the password.
     *
     * @var string
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = \Hash::make($value);
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('photos');
        $this->addMediaCollection('videos');
    }

    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('small')
            ->width(160)
            ->height(220);

        $this->addMediaConversion('medium')
            ->width(330)
            ->height(460);

        $this->addMediaConversion('large')
            ->width(535)
            ->height(785);
    }

    /**
     * @return BelongsToMany
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class)
            ->withPivot(['extra', 'cost']);
    }

    /**
     * @return BelongsToMany
     */
    public function prices(): BelongsToMany
    {
        return $this->belongsToMany(Price::class)
            ->withPivot('cost');
    }

    /**
     * @return MorphMany
     */
    public function events(): MorphMany
    {
        return $this->morphMany(Event::class, 'eventable');
    }
}

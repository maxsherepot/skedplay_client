<?php declare(strict_types=1);

namespace Modules\Users\Entities;

use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Laravel\Passport\HasApiTokens;
use Modules\Main\Services\Cashier\Billable;
use Modules\Main\Services\Location\HasLocation;
use Modules\Main\Services\Location\Locationable;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class User extends AuthUser implements HasMedia, HasLocation
{
    use Billable, Locationable, HasMediaTrait, HasApiTokens, LaratrustUserTrait, Notifiable;

    use Authorizable {
        Authorizable::can insteadof LaratrustUserTrait;
        LaratrustUserTrait::can as laratrustCan;
    }

    const ACCOUNT_ADMIN = 'admin';
    const ACCOUNT_CLIENT = 'client';
    const ACCOUNT_GIRL = 'girl';
    const ACCOUNT_MODERATOR = 'moderator';
    const ACCOUNT_CLUB_OWNER = 'club_owner';

    const REGISTER_TYPES = [
        self::ACCOUNT_CLIENT,
        self::ACCOUNT_GIRL,
        self::ACCOUNT_CLUB_OWNER
    ];

    const GENDER_MALE = 1;
    const GENDER_FEMALE = 2;

    const REGISTER_GENDERS = [
        self::GENDER_MALE,
        self::GENDER_FEMALE,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'club_type',
        'phone',
        'email',
        'password',
        'type',
        'short_description',
        'description',
        'vip',
        'trial_ends_at',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

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

    public function clubs()
    {
        return $this->hasMany(Club::class);
    }
}

<?php

namespace Modules\Users\Entities;

use Illuminate\Foundation\Auth\Access\Authorizable;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Laratrust\Traits\LaratrustUserTrait;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends AuthUser implements HasMedia
{
    use HasMediaTrait, HasApiTokens, LaratrustUserTrait, Notifiable;

    use Authorizable {
        Authorizable::can insteadof LaratrustUserTrait;
        LaratrustUserTrait::can as laratrustCan;
    }

    const DEFAULT_LATITUDE = '40.6976701';
    const DEFAULT_LONGITUDE = '-74.259875';
    const DEFAULT_COORDINATES = self::DEFAULT_LATITUDE . ', ' . self::DEFAULT_LONGITUDE;

    const ACCOUNT_ADMIN = 'admin';
    const ACCOUNT_CLIENT = 'client';
    const ACCOUNT_MODEL = 'model';
    const ACCOUNT_MODERATOR = 'moderator';
    const ACCOUNT_CLUB_OWNER = 'club_owner';

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
        'user_type',
        'lat',
        'lng',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    const REGISTER_TYPES = [
        self::ACCOUNT_CLIENT,
        self::ACCOUNT_MODEL,
        self::ACCOUNT_CLUB_OWNER
    ];

    /**
     * @param $coordinates
     */
    public function setCoordinatesAttribute($coordinates)
    {
        if (is_array($coordinates)) {
            $this->lat = $coordinates['lat'] ?? self::DEFAULT_LATITUDE;
            $this->lng = $coordinates['lng'] ?? self::DEFAULT_LONGITUDE;
        }
        if (is_string($coordinates)) {
            $coordinates = explode(',', str_replace(' ', '', $coordinates));
            $this->lat = $coordinates[0];
            $this->lng = $coordinates[1];
        }
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
}

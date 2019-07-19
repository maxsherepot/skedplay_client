<?php

namespace Modules\Users\Entities;

use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Laratrust\Traits\LaratrustUserTrait;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends AuthUser implements HasMedia
{
    use HasMediaTrait, HasApiTokens, LaratrustUserTrait, Notifiable;

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
     * This mutator automatically hashes the password.
     *
     * @var string
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = \Hash::make($value);
    }
}

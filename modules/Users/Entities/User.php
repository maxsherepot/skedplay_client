<?php

namespace Modules\Users\Entities;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements HasMedia
{
	use HasMediaTrait, HasApiTokens, LaratrustUserTrait, Notifiable;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name',
		'email',
		'password',
		'avatar',
	];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password', 'remember_token'];

//	/**
//	 * This mutator automatically hashes the password.
//	 *
//	 * @var string
//	 */
//	public function setPasswordAttribute($value)
//	{
//		$this->attributes['password'] = \Hash::make($value);
//	}
}

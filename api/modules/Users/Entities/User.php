<?php declare(strict_types=1);

namespace Modules\Users\Entities;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Laravel\Passport\HasApiTokens;
use Modules\Billing\Traits\Billable;
use Modules\Chat\Entities\Chat;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\Traits\HasFavoriteables;
use Modules\Users\Entities\Traits\HasPermissionPlan;
use Firebase\JWT\JWT;

class User extends AuthUser implements EmployeeOwnerInterface
{
    use Billable, HasApiTokens, LaratrustUserTrait, HasPermissionPlan, Notifiable, HasFavoriteables;

    use Authorizable {
        Authorizable::can insteadof LaratrustUserTrait;
        LaratrustUserTrait::can as laratrustCan;
    }

    const ACCOUNT_CLIENT = Role::CLIENT;
    const ACCOUNT_EMPLOYEE = Role::EMPLOYEE_OWNER;
    const ACCOUNT_CLUB_OWNER = Role::CLUB_OWNER;

    const REGISTER_TYPES = [
        self::ACCOUNT_CLIENT,
        self::ACCOUNT_EMPLOYEE,
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
        'name',
        'phone',
        'birthday',
        'age',
        'gender',
        'email',
        'password',
    ];

    protected $appends = [
        'is_client',
        'is_club_owner',
        'is_employee',
        'employees_photos',
        'employees_videos',
        'employees_events',
        'jwt_connection_token'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Find the user instance for the given username.
     *
     * @param string $username
     * @return \Modules\Users\Entities\User
     */
    public function findForPassport($username)
    {
        return $this->where('phone', $username)->first();
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

    /**
     * @return bool
     */
    public function getIsClientAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_CLIENT);
    }

    /**
     * @return bool
     */
    public function getIsClubOwnerAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_CLUB_OWNER);
    }

    /**
     * @return bool
     */
    public function getIsEmployeeAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_EMPLOYEE);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function clubs()
    {
        return $this->hasMany(Club::class);
    }

    /**
     * @return MorphMany
     */
    public function employees(): MorphMany
    {
        return $this->morphMany(Employee::class, 'owner');
    }

    /**
     * @return mixed
     */
    public function getEmployeesPhotosAttribute()
    {
        return $this->employees->reduce(function ($count, $employee) {
            return $count + $employee->photos->count();
        }, 0);
    }

    /**
     * @return mixed
     */
    public function getEmployeesVideosAttribute()
    {
        return $this->employees->reduce(function ($count, $employee) {
            return $count + $employee->videos->count();
        }, 0);
    }

    /**
     * @return mixed
     */
    public function getEmployeesEventsAttribute()
    {
        return $this->employees->reduce(function ($count, $employee) {
            return $count + $employee->events->count();
        }, 0);
    }


    public function employees_club_owners()
    {
        return $this->hasManyThrough(
            Employee::class,
            Club::class,
            'user_id',
            'owner_id'
        )->where('owner_type', (new Club())->getMorphClass());
    }

    public function events_club_owners()
    {
        return $this->hasManyThrough(
            Event::class,
            Club::class,
            'user_id',
            'owner_id'
        )->where('owner_type', (new Club())->getMorphClass());
    }

    public function getJwtConnectionTokenAttribute()
    {
        return JWT::encode(['sub' => $this->id], config('chat.centrifuge_secret'), 'HS256');
    }

    public function chats()
    {
        return $this->hasMany(Chat::class)
            ->where('receiver_id', $this->id)
            ->orWhere('creator_id', $this->id)
            ->orderBy('last_message_datetime', 'desc');
    }
}

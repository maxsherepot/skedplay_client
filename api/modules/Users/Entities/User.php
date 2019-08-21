<?php declare(strict_types=1);

namespace Modules\Users\Entities;

use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Laravel\Passport\HasApiTokens;
use Modules\Billing\Traits\Billable;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\Traits\HasPermissionPlan;

class User extends AuthUser implements EmployeeOwnerInterface
{
    use Billable, HasApiTokens, LaratrustUserTrait, HasPermissionPlan, Notifiable;

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

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Find the user instance for the given username.
     *
     * @param  string  $username
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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function clubs()
    {
        return $this->hasMany(Club::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function employee()
    {
        return $this->morphOne(Employee::class, 'owner');
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
}

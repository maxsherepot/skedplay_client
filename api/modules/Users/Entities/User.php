<?php declare(strict_types=1);

namespace Modules\Users\Entities;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Laravel\Passport\HasApiTokens;
use Modules\Billing\Traits\Billable;
use Modules\Chat\Entities\Chat;
use Modules\Chat\Entities\ChatMember;
use Modules\Chat\Entities\Message;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\Service;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeOwnerInterface;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\Traits\HasFavoriteables;
use Modules\Users\Entities\Traits\HasPermissionPlan;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;
use Firebase\JWT\JWT;

/**
 * Class User
 * @package Modules\Users\Entities
 *
 * @property Media avatar
 * @property int id
 * @property int status
 * @property string rejected_reason
 * @property int age
 * @property string password
 */
class User extends AuthUser implements EmployeeOwnerInterface, ChatMember, HasMedia
{
    use Billable, HasApiTokens, LaratrustUserTrait, HasPermissionPlan, Notifiable, HasFavoriteables, HasMediaTrait;

    use Authorizable {
        Authorizable::can insteadof LaratrustUserTrait;
        LaratrustUserTrait::can as laratrustCan;
    }
    const PHOTO_AVATAR = 'user-avatar';
    const VERIFY_PHOTO = 'verify-photo';

    const ACCOUNT_CLIENT = Role::CLIENT;
    const ACCOUNT_EMPLOYEE = Role::EMPLOYEE_OWNER;
    const ACCOUNT_CLUB_OWNER = Role::CLUB_OWNER;
    const ACCOUNT_MANAGER = Role::MANAGER;
    const ACCOUNT_ADMIN = Role::ADMIN;
    const ACCOUNT_MODERATOR = Role::MODERATOR;


    const REGISTER_TYPES = [
        self::ACCOUNT_CLIENT,
        self::ACCOUNT_EMPLOYEE,
        self::ACCOUNT_CLUB_OWNER,
        self::ACCOUNT_MANAGER
    ];

    const GENDER_MALE = 1;
    const GENDER_FEMALE = 2;
    const GENDER_COUPLE = 3;

    const REGISTER_GENDERS = [
        self::GENDER_MALE,
        self::GENDER_FEMALE,
    ];

    const STATUS_AWAITING_CONFIRMATION = 0;
    const STATUS_CONFIRMED = 1;
    const STATUS_REFUSED = 2;

    const STATUSES = [
        self::STATUS_AWAITING_CONFIRMATION => 'Awaiting confirmation',
        self::STATUS_CONFIRMED => 'Confirmed',
        self::STATUS_REFUSED => 'Refused',
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
        'avatar',
    ];

    protected $appends = [
        'is_client',
        'is_club_owner',
        'is_moderator',
        'is_employee',
        'is_manager',
        'is_admin',
        'employees_photos',
        'employees_videos',
        'employees_events',
        'jwt_connection_token',
        'nova_status',
        'readable_status',
        'age',
    ];

    protected $dates = ['birthday'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public static function boot()
    {
        parent::boot();

        static::saving(function(self $user) {
            if (
                ($user->attributes['role_id'] ?? false)
                && request()->user()
                && (
                    request()->user()->hasRole(User::ACCOUNT_ADMIN)
                    || request()->user()->hasRole(User::ACCOUNT_MANAGER)
                )
            ) {
                cache()->put('user_role_attach', $user->attributes['role_id'], now()->addSeconds(30));

                $user->attributes = collect($user->getAttributes())
                    ->filter(fn($value, $key) => $key !== 'role_id')
                    ->toArray();
            }
        });

        static::saved(function(self $user) {
            if (
                cache()->get('user_role_attach')
                && request()->user()
                && (
                    request()->user()->hasRole(User::ACCOUNT_ADMIN)
                    || request()->user()->hasRole(User::ACCOUNT_MANAGER)
                )
            ) {
                $user->syncRoles(Role::where('id', cache()->get('user_role_attach'))->get());
                cache()->forget('user_role_attach');
            }
        });
    }

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

    public function registerMediaCollections()
    {
        $this->addMediaCollection(self::PHOTO_AVATAR)->singleFile();
        $this->addMediaCollection(self::VERIFY_PHOTO)->singleFile();
    }

    /**
     * @param Media|null $media
     * @throws \Spatie\Image\Exceptions\InvalidManipulation
     */
    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('thumb')->height(470)->performOnCollections(self::PHOTO_AVATAR);
        $this->addMediaConversion('thumb')->height(470)->performOnCollections(self::VERIFY_PHOTO);
    }

    public function getRoleIdAttribute(): ?int
    {
        return $this->roles->first()->id ?? null;
    }

    /**
     * @return bool
     */
    public function getIsClientAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_CLIENT);
    }

    public function getIsClientChatMemberAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_CLIENT) || $this->hasRole(self::ACCOUNT_ADMIN);
    }

    /**
     * @return bool
     */
    public function getIsClubOwnerAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_CLUB_OWNER);
    }

    public function getIsModeratorAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_MODERATOR);
    }

    /**
     * @return bool
     */
    public function getIsEmployeeAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_EMPLOYEE);
    }

    /**
     * @return bool
     */
    public function getIsManagerAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_MANAGER);
    }

    public function getIsAdminAttribute(): bool
    {
        return $this->hasRole(self::ACCOUNT_ADMIN);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function clubs()
    {
        return $this->hasMany(Club::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function moderatedClubs()
    {
        return $this->hasMany(Club::class, 'moderator_id');
    }

    public function moderated_clubs()
    {
        return $this->moderatedClubs();
    }

    public function card(): HasOne
    {
        return $this->hasOne(UserCard::class);
    }

    /**
     * @return MorphMany
     */
    public function employees(): MorphMany
    {
        return $this->morphMany(Employee::class, 'owner');
    }

    /**
     * @return MorphOne
     */
    public function employee(): MorphOne
    {
        return $this->morphOne(Employee::class, 'user', 'owner_type', 'owner_id');
    }

    /**
     * @return BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class)->withPivot('user_type','user_id');
    }

    public function events(): MorphMany
    {
        return $this->morphMany(Event::class, 'owner');
    }

    /**
     * @return mixed
     */
    public function getTypeAttribute()
    {
        return $this->roles->first() ?? Role::query()
            ->where('name', '=', 'manager')
            ->getModel();
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
        return $this->events()->count();
    }

    /**
     * @return HasOne
     */
    public function avatar(): HasOne
    {
        return $this
            ->hasOne(Media::class, 'model_id', 'id')
            ->where('collection_name', self::PHOTO_AVATAR);
    }

    public function verify_photo(): HasOne
    {
        return $this
            ->hasOne(Media::class, 'model_id', 'id')
            ->where('collection_name', self::VERIFY_PHOTO);
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


    public function getChatsQuery()
    {
        return Chat::query()
            ->where('chats.receiver_id', $this->id)
            ->orWhere('chats.creator_id', $this->id)
            ->orderBy('updated_at', 'desc');
    }

    public function unreadMessagesCount(): int
    {
        // TODO сделать для каждой роли свой счетчик

        return Message::query()
            ->select(['messages.*'])
            ->leftJoin('chats', 'chats.id', '=', 'messages.chat_id')
            ->whereFromClient(0)
            ->whereSeen(0)
//            ->where('chats.employee_id', $this->id)
            ->where('chats.client_id', $this->id)
            ->count();
    }

    public function getNovaStatusAttribute(): string
    {
        $status = $this->attributes['status'] ?? self::STATUS_AWAITING_CONFIRMATION;

        if ($status === self::STATUS_CONFIRMED) {
            return $this->created_at->longAbsoluteDiffForHumans(now());
        }

        return self::STATUSES[$status];
    }

    public function getCreatedAtDiff(): string
    {
        return $this->created_at->longAbsoluteDiffForHumans(now());
    }

    public function getReadableStatusAttribute(): string
    {
        $status = $this->attributes['status'] ?? self::STATUS_AWAITING_CONFIRMATION;

        return self::STATUSES[$status];
    }

    /**
     * @return int|null
     */
    public function getAgeAttribute(): ?int
    {
        if ($this->attributes['age'] ?? false) {
            return $this->attributes['age'];
        }

        if (!$this->birthday) {
            return null;
        }

        return Carbon::parse($this->birthday)->diffInYears();
    }

    public function isClient(): bool
    {
        return !$this->hasRole('employee');
    }

    public function isModerator(): bool
    {
        return $this->hasRole(self::ACCOUNT_MODERATOR);
    }

    public function isEmployee(): bool
    {
        return $this->hasRole('employee');
    }

    public function isManager(): bool
    {
        return $this->hasRole('manager');
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(self::ACCOUNT_ADMIN);
    }
}

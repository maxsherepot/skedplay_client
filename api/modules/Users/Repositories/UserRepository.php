<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Carbon\Carbon;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Collection;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Traits\Mediable;
use Modules\Users\Entities\User;
use Modules\Users\Entities\UserCard;

class UserRepository implements HasMediable
{
    use Mediable;

    /**
     * @param Collection $collection
     * @return User
     */
    public function store(Collection $collection): User
    {
        $collection['password'] = \Hash::make($collection['password']);

        return User::create($collection->toArray());
    }

    /**
     * @param User $user
     * @param Collection $collection
     * @return User
     */
    public function update(User $user, Collection $collection): User
    {
        try {
            if ($collection['birthday']) {
                $collection['birthday'] = Carbon::parse($collection['birthday']);
                $collection['age'] = Carbon::parse($collection['birthday'])->age;
            }
            if ($collection['password']) {
                $collection['password'] = \Hash::make($collection['password']);
            }
        } catch (\Exception $e) {
            $collection['birthday'] = null;
        }
        $user->update($collection->toArray());

        return $user;
    }

    /**
     * @param int $id
     */
    public function updateStatusConfirm(int $id): void
    {
        User::query()
            ->where('id', '=', $id)
            ->update([
            'status' => User::STATUS_CONFIRMED,
            'rejected_reason' => null,
        ]);
    }

    /**
     * @param int $id
     * @param string $reason
     */
    public function updateStatusReject(int $id, string $reason): void
    {
        User::query()
            ->where('id', '=', $id)
            ->update([
                'status' => User::STATUS_REFUSED,
                'rejected_reason' => $reason
            ])
        ;
    }
    /**
     * @param int $id
     * @return User|null|object
     */
    public function find(int $id): ?User
    {
        return User::query()->find($id);
    }

    /**
     * @param $phone
     * @return \Illuminate\Database\Eloquent\Model|null|object|static
     */
    public function getByPhone($phone)
    {
        return User::where('phone', $phone)->first();
    }

    /**
     *
     * Reset the given user's password.
     *
     * @param string $password
     * @param $user
     * @return void
     */
    public function resetPassword($password, $user)
    {
        $user->password = $password;

        $user->save();

        event(new PasswordReset($user));
    }

    /**
     * @param User $user
     * @return string
     */
    public function createToken(User $user): string
    {
        return $user->createToken('Laravel Password Grant Client')->accessToken;
    }

    public function createCard(User $user, string $refCode = null): void
    {
        if ($user->is_client) {
            $userType = UserCard::USER_TYPE_CLIENT;
        } elseif ($user->is_club_owner) {
            $userType = UserCard::USER_TYPE_CLUB_OWNER;
        } elseif ($user->isEmployee()) {
            $userType = UserCard::USER_TYPE_EMPLOYEE;
        } else {
            return;
        }

        $refUserId = $refCode
            ? optional(UserCard::where('full_code', $refCode)->first())->user_id
            : null;

        $user->card()->create([
            'card_type' => 1,
            'user_type' => $userType,
            'code' => mt_rand(1000000, 9999999),
            'ref_user_id' => $refUserId,
        ]);
    }
}

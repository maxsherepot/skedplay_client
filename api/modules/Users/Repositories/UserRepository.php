<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Collection;
use Modules\Users\Entities\User;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Traits\Mediable;


class UserRepository implements HasMediable
{
    use Mediable;

    /**
     * @param Collection $collection
     * @return User
     */
    public function store(Collection $collection): User
    {
        return User::create($collection->toArray());
    }

    /**
     * @param User $user
     * @param Collection $collection
     * @return User
     */
    public function update(User $user, Collection $collection): User
    {
        $user->update($collection->toArray());

        return $user;
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
}

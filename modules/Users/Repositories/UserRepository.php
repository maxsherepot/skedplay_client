<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Collection;
use Modules\Users\Entities\User;

class UserRepository
{
    /**
     * @param Collection $collection
     * @return User
     */
    public function store(Collection $collection): User
    {
        return User::create($collection->toArray());
    }

    /**
     * @param Collection $collection
     * @return bool
     */
    public function update(Collection $collection): bool
    {
        //
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
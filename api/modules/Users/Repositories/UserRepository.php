<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Modules\Users\Entities\User;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Traits\Mediable;


class UserRepository implements HasMediable
{
    use Mediable;

    /**
     * @param Collection $collection
     * @return User
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function store(Collection $collection): User
    {
        $inputs = $collection->toArray();

        DB::beginTransaction();

        /** @var User $user */
        $user = User::create($inputs);

        $user->save();

        if ($avatar = $collection->get('avatar')) {
            dd(dfghjk);
            $user->addMedia($avatar)->toMediaCollection(User::PHOTO_AVATAR);
        }

        DB::commit();

        return $user;
    }

    /**
     * @param User $user
     * @param Collection $collection
     * @return bool
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function update(User $user, Collection $collection): bool
    {
        DB::beginTransaction();
        $result = $user->update($collection->toArray());

        if ($avatar = $collection->get('avatar')) {
            dd(dfghjk);

            $user->addMedia($avatar)->toMediaCollection(User::PHOTO_AVATAR);
        }

        DB::commit();

        return $result;
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

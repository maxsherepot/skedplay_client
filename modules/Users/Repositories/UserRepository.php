<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Collection;
use Modules\Users\Entities\User;
use Illuminate\Support\Str;

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
     * @param User $user
     * @param Collection $collection
     * @return bool
     */
    public function update(User $user, Collection $collection): bool
    {
        return $user->update($collection->toArray());
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

    /**
     * Save user attachments
     * @param User $user
     * @param $files
     * @param string $collection
     */
    public function saveAttachments(User $user, $files, $collection = 'photos')
    {
        foreach ($files as $file) {
            $this->saveFile($user, $file, $collection);
        }
    }

    /**
     * @param User $user
     * @param UploadedFile $file
     * @param $collection
     * @return void
     */
    public function saveFile(User $user, UploadedFile $file, $collection)
    {
        $fileName = $file->getClientOriginalName();
        $extension = Str::slug($file->getClientOriginalExtension());
        $storeName = md5($fileName . time()) . '.' . $extension;

        $user->addMedia($file)
            ->usingName($storeName)
            ->toMediaCollection($collection, 'media');
    }
}
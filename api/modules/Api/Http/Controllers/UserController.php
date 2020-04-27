<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Support\Arr;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\FileUploadRequest;
use Modules\Api\Http\Requests\User\UserUpdateRequest;
use Modules\Common\Traits\Mediable;
use Modules\Users\Entities\User;
use Modules\Users\Repositories\UserRepository;
use Nwidart\Modules\Routing\Controller;

class UserController extends Controller
{
    use Statusable;

    /**
     * @var UserRepository
     */
    protected $users;

    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * @param User $user
     * @param UserUpdateRequest $request
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $this->users->update($user, collect($request->all()));

        return $this->success("user.update.success");
    }

    /**
     * @param FileUploadRequest $request
     * @param User $user
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadAvatar(FileUploadRequest $request, User $user): array
    {
        $this->authorize('update', $user);

        /** @var User $currentUser */
        $currentUser = $request->user();

        try {
            $this->users->saveAttachments(
                $currentUser,
                $request->allFiles(),
                $request->get('collection')
            );

            return $this->success(
                $this->users::UPLOAD_FILE_SUCCESS
            );
        } catch (\Exception $exception) {
            return $this->fail(
               $this->users::UPLOAD_FILE_FAILED
            );
        }
    }

    /**
     * @param FileUploadRequest $request
     * @param User $user
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadVerifyPhoto(FileUploadRequest $request, User $user): array
    {
        $this->authorize('update', $user);

        /** @var User $currentUser */
        $currentUser = $request->user();

        try {
            $this->users->saveAttachments(
                $currentUser,
                $request->allFiles(),
                $request->get('collection')
            );

            return $this->success(
                $this->users::UPLOAD_FILE_SUCCESS
            );
        } catch (\Exception $exception) {
            return $this->fail(
                $this->users::UPLOAD_FILE_FAILED
            );
        }
    }
}

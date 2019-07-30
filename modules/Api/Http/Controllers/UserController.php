<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\UploadPhotoRequest;
use Modules\Api\Http\Requests\UploadVideoRequest;
use Modules\Api\Http\Requests\User\UserUpdateRequest;
use Modules\Users\Entities\User;
use Modules\Users\Repositories\UserRepository;

class UserController extends Controller
{
    use Statusable;

    protected $users;

    public function __construct(UserRepository $repository)
    {
        $this->users = $repository;
    }

    /**
     * @param User $user
     * @param UserUpdateRequest $request
     * @return array
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        /**
         * TODO USER POLICY
         */

        $user = $this->users->update($user, collect($request->all()));

        return $this->success();
    }

    /**
     * @param UploadPhotoRequest $request
     * @param User $user
     * @return void
     */
    public function uploadPhoto(UploadPhotoRequest $request, User $user)
    {
        /**
         * TODO USER POLICY
         */

        $this->users->saveAttachments($user, $request->files, 'photos');
    }

    /**
     * @param UploadVideoRequest $request
     * @param User $user
     * @return void
     */
    public function uploadVideo(UploadVideoRequest $request, User $user)
    {
        /**
         * TODO USER POLICY
         */

        $this->users->saveAttachments($user, $request->files, 'videos');
    }
}

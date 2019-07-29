<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controller;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\User\UserUpdateRequest;
use Modules\Api\Http\Requests\User\UserUploadPhotoRequest;
use Modules\Api\Http\Requests\User\UserUploadVideoRequest;
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
     * @param Request $request
     * @param User $user
     * @return LengthAwarePaginator
     */
    public function index(Request $request, User $user): LengthAwarePaginator
    {
        return $this->users->paginate($request->get('count'), $user);
    }

    /**
     * @param User $user
     * @return User
     */
    public function show(User $user): User
    {
        return $user;
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
     * @param UserUploadPhotoRequest $request
     * @param User $user
     * @return void
     */
    public function uploadPhoto(UserUploadPhotoRequest $request, User $user)
    {
        /**
         * TODO USER POLICY
         */

        $this->users->saveAttachments($user, $request->files, 'photos');
    }

    /**
     * @param UserUploadVideoRequest $request
     * @param User $user
     * @return void
     */
    public function uploadVideo(UserUploadVideoRequest $request, User $user)
    {
        /**
         * TODO USER POLICY
         */

        $this->users->saveAttachments($user, $request->files, 'videos');
    }
}

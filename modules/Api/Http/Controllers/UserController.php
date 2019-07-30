<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Api\Http\Requests\UploadPhotoRequest;
use Modules\Api\Http\Requests\UploadVideoRequest;
use Modules\Api\Http\Requests\User\UserUpdateRequest;
use Modules\Main\Entities\Event;
use Modules\Main\Repositories\EventRepository;
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

    /**
     * @var EventRepository
     */
    protected $events;

    public function __construct(UserRepository $users, EventRepository $events)
    {
        $this->users = $users;
        $this->events = $events;
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

        $user = $this->users->update($user, collect($request->all()));

        return $this->success();
    }

    /**
     * @param UploadPhotoRequest $request
     * @param User $user
     * @return void
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadPhoto(UploadPhotoRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $this->users->saveAttachments($user, $request->files, 'photos');
    }

    /**
     * @param UploadVideoRequest $request
     * @param User $user
     * @return void
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadVideo(UploadVideoRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $this->users->saveAttachments($user, $request->files, 'videos');
    }

    /**
     * @param User $user
     * @param EventCreateRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function createEvent(User $user, EventCreateRequest $request)
    {
        $this->authorize('create', Event::class);

        return $this->events->store($user, collect($request->all()));
    }
}

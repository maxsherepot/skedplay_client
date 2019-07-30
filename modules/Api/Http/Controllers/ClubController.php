<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Club\ClubCreateRequest;
use Modules\Api\Http\Requests\Club\ClubUpdateRequest;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Api\Http\Requests\UploadPhotoRequest;
use Modules\Api\Http\Requests\UploadVideoRequest;
use Modules\Main\Entities\Event;
use Modules\Main\Repositories\EventRepository;
use Modules\Users\Entities\Club;
use Modules\Users\Repositories\ClubRepository;
use Nwidart\Modules\Routing\Controller;

class ClubController extends Controller
{
    use Statusable;

    /**
     * @var ClubRepository
     */
    protected $clubs;

    /**
     * @var EventRepository
     */
    protected $events;

    public function __construct(ClubRepository $clubs, EventRepository $events)
    {
        $this->clubs = $clubs;
        $this->events = $events;
    }

    /**
     * @param ClubCreateRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function create(ClubCreateRequest $request)
    {
        $this->authorize('create', Club::class);

        return $this->clubs->store($request->user('api'), collect($request->all()));
    }

    /**
     * @param ClubUpdateRequest $request
     * @param Club $club
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(ClubUpdateRequest $request, Club $club)
    {
        $this->authorize('update', $club);

        $club = $this->clubs->update($club, collect($request->all()));

        return $this->success();
    }

    /**
     * @param UploadPhotoRequest $request
     * @param Club $club
     * @return void
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadPhoto(UploadPhotoRequest $request, Club $club)
    {
        $this->authorize('update', $club);

        $this->clubs->saveAttachments($club, $request->files, 'photos');
    }

    /**
     * @param UploadVideoRequest $request
     * @param Club $club
     * @return void
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadVideo(UploadVideoRequest $request, Club $club)
    {
        $this->authorize('update', $club);

        $this->clubs->saveAttachments($club, $request->files, 'videos');
    }

    /**
     * @param Club $club
     * @param EventCreateRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function createEvent(Club $club, EventCreateRequest $request)
    {
        $this->authorize('create', Event::class);

        return $this->events->store($club, collect($request->all()));
    }
}

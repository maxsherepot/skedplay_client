<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Event\EventUpdateRequest;
use Modules\Api\Http\Requests\UploadPhotoRequest;
use Modules\Main\Entities\Event;
use Modules\Main\Repositories\EventRepository;
use Nwidart\Modules\Routing\Controller;

class EventController extends Controller
{
    use Statusable;

    /**
     * @var EventRepository
     */
    protected $events;

    public function __construct(EventRepository $repository)
    {
        $this->events = $repository;
    }

    /**
     * @param EventUpdateRequest $request
     * @param Event $event
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(EventUpdateRequest $request, Event $event)
    {
        $this->authorize('update', $event);

        $event = $this->events->update($event, collect($request->all()));

        return $this->success();
    }

    /**
     * @param UploadPhotoRequest $request
     * @param Event $event
     * @return void
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadMainPhoto(UploadPhotoRequest $request, Event $event)
    {
        $this->authorize('update', $event);

        $this->events->saveFile($event, $request->file('file'), 'main_photo');
    }

}

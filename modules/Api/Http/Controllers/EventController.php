<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Event\EventUpdateRequest;
use Modules\Api\Http\Requests\UploadPhotoRequest;
use Modules\Events\Entities\Event;
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

        $response = $this->events->update($event, collect($request->all()));

        return $response ? $this->success() : $this->fail();
    }

    /**
     * @param Event $event
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Exception
     */
    public function delete(Event $event)
    {
        $this->authorize('delete', $event);

        $response = $this->events->delete($event);

        return $response ? $this->success() : $this->fail();
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

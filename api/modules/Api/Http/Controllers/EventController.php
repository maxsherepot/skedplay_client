<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Event\EventUpdateRequest;
use Modules\Api\Http\Requests\FileDeleteRequest;
use Modules\Api\Http\Requests\FileUploadRequest;
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
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function update(EventUpdateRequest $request, Event $event)
    {
        $this->authorize('update', $event) ;

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

        $id = (string) $event->id;

        $response = $this->events->delete($event);

        return $response ? $this->success($id) : $this->fail();
    }

    /**
     * @param FileUploadRequest $request
     * @param Event $event
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadFile(FileUploadRequest $request, Event $event)
    {
        $this->authorize('update', $event);

        try {
            $this->events->saveFile(
                $event,
                $request->file('file'),
                $request->get('collection')
            );

            return $this->success(
                $this->events::UPLOAD_FILE_SUCCESS
            );
        } catch (\Exception $exception) {
            return $this->fail(
                $this->events::UPLOAD_FILE_FAILED
            );
        }
    }

    /**
     * @param FileDeleteRequest $request
     * @param Event $event
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function deleteFile(FileDeleteRequest $request, Event $event)
    {
        $this->authorize('update', $event);

        try {
            $this->events->deleteFile(
                $event,
                $request->get('file_id')
            );

            return $this->success(
                $this->events::DELETE_FILE_SUCCESS
            );
        } catch (\Exception $exception) {
            return $this->fail(
                $this->events::DELETE_FILE_FAILED
            );
        }
    }
}

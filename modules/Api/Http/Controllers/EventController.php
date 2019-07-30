<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\UploadPhotoRequest;
use Modules\Main\Entities\Event;
use Modules\Main\Repositories\EventRepository;

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
     * @param UploadPhotoRequest $request
     * @param Event $event
     * @return void
     */
    public function uploadMainPhoto(UploadPhotoRequest $request, Event $event)
    {
        /**
         * TODO EVENT POLICY
         */

        $this->events->saveFile($event, $request->file('file'), 'main_photo');
    }

}

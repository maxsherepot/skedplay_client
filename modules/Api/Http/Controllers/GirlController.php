<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Main\Entities\Event;
use Modules\Main\Repositories\EventRepository;
use Modules\Users\Entities\Girl;
use Nwidart\Modules\Routing\Controller;

class GirlController extends Controller
{
    use Statusable;

    /**
     * @var EventRepository
     */
    protected $events;

    public function __construct(EventRepository $events)
    {
        $this->events = $events;
    }

    /**
     * @param Girl $girl
     * @param EventCreateRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function createEvent(Girl $girl, EventCreateRequest $request)
    {
        $this->authorize('create', Event::class);

        return $this->events->store($girl, collect($request->all()));
    }
}

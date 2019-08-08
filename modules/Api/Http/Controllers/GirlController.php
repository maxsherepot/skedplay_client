<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Api\Http\Requests\Girl\GirlUpdateRequest;
use Modules\Events\Entities\Event;
use Modules\Girls\Entities\Girl;
use Modules\Girls\Repositories\GirlRepository;
use Modules\Main\Repositories\EventRepository;
use Nwidart\Modules\Routing\Controller;

class GirlController extends Controller
{
    use Statusable;

    /**
     * @var GirlRepository
     */
    private $girls;

    /**
     * @var EventRepository
     */
    protected $events;

    public function __construct(GirlRepository $girls, EventRepository $events)
    {
        $this->girls = $girls;
        $this->events = $events;
    }

    /**
     * @param GirlUpdateRequest $request
     * @param Girl $girl
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(GirlUpdateRequest $request, Girl $girl)
    {
        $this->authorize('update', $girl);

        $this->girls->update($girl, collect($request->all()));

        return $this->success();
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

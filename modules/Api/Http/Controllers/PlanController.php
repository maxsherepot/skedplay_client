<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Event\EventUpdateRequest;
use Modules\Api\Http\Requests\FileDeleteRequest;
use Modules\Api\Http\Requests\FileUploadRequest;
use Modules\Events\Entities\Event;
use Modules\Main\Repositories\EventRepository;
use Modules\Main\Services\Cashier\Plan;
use Modules\Users\Entities\User;
use Nwidart\Modules\Routing\Controller;

class PlanController extends Controller
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

    public function subscribe(Plan $plan, User $user)
    {
        $user->newSubscription('main', $plan->id)->create();
    }
}

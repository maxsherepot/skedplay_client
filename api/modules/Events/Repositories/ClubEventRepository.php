<?php declare(strict_types=1);

namespace Modules\Main\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Traits\Mediable;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;
use Modules\Clubs\Entities\Club;

class ClubEventRepository implements HasMediable
{
    /**
     * @var EventRepository
     */
    private $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    public function store(Club $club, Collection $collection): Event
    {
        DB::beginTransaction();

        /** @var Event $event */
        $event = $this->eventRepository->store($club, $collection);

        $event->employees()->sync($collection->get('employees_ids', []));

        DB::commit();

        return $event;
    }

    public function update(Event $event, Collection $collection): bool
    {
        DB::beginTransaction();

        $result = $this->eventRepository->update($event, $collection);

        if (!$result) {
            return $result;
        }

        $event->employees()->sync($collection->get('employees_ids', []));

        DB::commit();

        return $result;
    }

    public function delete(Event $event): bool
    {
        return $this->eventRepository->delete($event);
    }
}

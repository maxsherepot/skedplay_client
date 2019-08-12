<?php declare(strict_types=1);

namespace Modules\Main\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;
use Modules\Clubs\Entities\Club;
use Modules\Users\Repositories\Traits\Mediable;

class EventRepository
{
    use Mediable;

    /**
     * @param Model $model
     * @param Collection $collection
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function store(Model $model, Collection $collection): \Illuminate\Database\Eloquent\Model
    {
        /** @var Club|Employee $model */
        return $model->events()->create($collection->toArray());
    }

    /**
     * @param Event $event
     * @param Collection $collection
     * @return bool
     */
    public function update(Event $event, Collection $collection): bool
    {
        return $event->update($collection->toArray());
    }

    /**
     * @param Event $event
     * @return bool
     * @throws \Exception
     */
    public function delete(Event $event): bool
    {
        return $event->delete();
    }
}

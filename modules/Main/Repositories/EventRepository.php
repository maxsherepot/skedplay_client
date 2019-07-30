<?php declare(strict_types=1);

namespace Modules\Main\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Modules\Main\Entities\Event;
use Modules\Users\Entities\Club;
use Modules\Users\Entities\Girl;
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
        /** @var Club|Girl $model */
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
}
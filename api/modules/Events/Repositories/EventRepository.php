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

class EventRepository implements HasMediable
{
    use Mediable;

    /**
     * @param Model $model
     * @param Collection $collection
     * @return Model
     */
    public function store(Model $model, Collection $collection): Model
    {
        /** @var Club|Employee $model */
        return $model->events()->create($collection->toArray());
    }

    /**
     * @param Event $event
     * @param Collection $collection
     * @return bool
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function update(Event $event, Collection $collection): bool
    {
        $response = $event->update($collection->toArray());

        if ($photos = $collection->get('photos')) {
            $this->saveAttachments($event, $photos, Event::MAIN_PHOTO_COLLECTION);
        }

        return $response;
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

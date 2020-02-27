<?php declare(strict_types=1);

namespace Modules\Main\Repositories;

use Carbon\Carbon;
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
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function store(Model $model, Collection $collection): Model
    {
        $collection = $this->handleInput($collection);

        /** @var Club|Employee $model */
        $event = $model->events()->create($collection->toArray());

        if ($photos = $collection->get('photos')) {
            $this->saveAttachments($event, $photos, Event::MAIN_PHOTO_COLLECTION);
        }

        return $event;
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
        $collection = $this->handleInput($collection);

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

    private function handleInput(Collection $collection): Collection
    {
        $startDate = $collection['start_date'] ?? null;

        try {
            $startDate = Carbon::parse($startDate);
        } catch (\Exception $e) {
            $startDate = null;
        }

        $endDate = $collection['end_date'] ?? null;

        try {
            $endDate = Carbon::parse($endDate);
        } catch (\Exception $e) {
            $endDate = null;
        }

        $collection['start_date'] = $startDate;
        $collection['end_date'] = $endDate;
        return $collection;
    }
}

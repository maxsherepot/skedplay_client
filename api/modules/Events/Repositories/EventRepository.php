<?php declare(strict_types=1);

namespace Modules\Events\Repositories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Traits\Mediable;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;
use Modules\Clubs\Entities\Club;
use Modules\Users\Entities\User;

class EventRepository implements HasMediable
{
    use Mediable;

    /**
     * @param Model $model
     * @param Collection $collection
     * @return \Modules\Clubs\Entities\Club|\Modules\Employees\Entities\Employee|\Illuminate\Database\Eloquent\Model
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function store(Model $model, Collection $collection): Model
    {
        $collection = $this->handleInput($collection);

        /** @var Club|User $model */
        $event = $model->events()->create($collection->toArray());

        $event->status = User::STATUS_CONFIRMED;
        $event->user_status = $model->user_status ?? $model->status;

        $event->save();

        /*if ($photos = $collection->get('photos')) {
            $this->saveAttachments($event, $photos, Event::MAIN_PHOTO_COLLECTION);
        }*/

        if ($mainPhoto = $collection->get('mainPhoto')) {
            $event->addMedia($mainPhoto)->toMediaCollection(Event::MAIN_PHOTO_COLLECTION);
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
        //DB::beginTransaction();
        $collection = $this->handleInput($collection);

        /*if ($photos = $collection->get('photos')) {
            $this->saveAttachments($event, $photos, Event::MAIN_PHOTO_COLLECTION);
        }*/

        if ($mainPhoto = $collection->get('mainPhoto')) {
            $event->addMedia($mainPhoto)->toMediaCollection(Event::MAIN_PHOTO_COLLECTION);
        }
        //DB::commit();

        return $event->update($collection->toArray());
    }

    /**
     * @param int $club_id
     * @param int $status
     */
    public function updateUserStatusByClubId(int $club_id, int $status): void
    {
        Event::query()
            ->where([
                ['owner_type', '=','club'],
                ['club_id', '=', $club_id],
            ])
            ->update(
                ['user_status' => $status]
            )
        ;
    }

    /**
     * @param int $id
     * @param int $status
     * @param string $type
     */
    public function updateUserStatusByOwnerId(int $id, int $status, string $type): void
    {
        Event::query()
            ->where([
                ['owner_type', '=',$type],
                ['owner_id', '=', $id],
            ])
            ->update(
                ['user_status' => $status]
            )
        ;
    }

    public function updateAllStatusConfirm(): void
    {
        Event::query()->update(['status' => User::STATUS_CONFIRMED]);
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

    public function getEventsToNotification(): \Generator
    {
        return Event::query()
            ->where([
                ['status', '=', User::STATUS_CONFIRMED],
                ['isSent', '=', false]
            ])
            ->cursor();
    }
}

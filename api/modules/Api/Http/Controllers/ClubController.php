<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Components\NotifyAdminTelegramComponent;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Club\ClubCreateRequest;
use Modules\Api\Http\Requests\Club\ClubUpdateRequest;
use Modules\Api\Http\Requests\Common\SyncPricesRequest;
use Modules\Api\Http\Requests\Common\SyncServicesRequest;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Api\Http\Requests\Event\EventUpdateRequest;
use Modules\Api\Http\Requests\FileDeleteRequest;
use Modules\Api\Http\Requests\FileUploadRequest;
use Modules\Api\Http\Requests\Schedule\ClubScheduleCreateRequest;
use Modules\Api\Http\Requests\Schedule\ClubScheduleUpdateRequest;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\PriceType;
use Modules\Common\Entities\Service;
use Modules\Common\Repositories\PriceRepository;
use Modules\Common\Repositories\ServiceRepository;
use Modules\Events\Entities\Event;
use Modules\Main\Repositories\ClubEventRepository;
use Modules\Users\Repositories\ClubRepository;
use Nwidart\Modules\Routing\Controller;

class ClubController extends Controller
{
    use Statusable;

    /**
     * @var ClubRepository
     */
    protected $clubs;

    /**
     * @var ClubEventRepository
     */
    protected $events;

    /**
     * @var ServiceRepository
     */
    private $services;

    /**
     * @var PriceRepository
     */
    private $prices;

    public function __construct(ClubRepository $clubs, ClubEventRepository $events, ServiceRepository $services, PriceRepository $prices)
    {
        $this->clubs = $clubs;
        $this->events = $events;
        $this->services = $services;
        $this->prices = $prices;
    }

  /**
   * @param ClubCreateRequest $request
   * @return \Illuminate\Database\Eloquent\Model
   * @throws \Illuminate\Auth\Access\AuthorizationException
   * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
   * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
   * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
   */
    public function create(ClubCreateRequest $request)
    {
        $this->authorize('create', Club::class);
        $club = $this->clubs->store($request->user('api'), collect($request->all()));

        $message = 'A new club had been registered for moderation '.rtrim(env('APP_URL'),'/').'/clubs/'.$club->id;
        (new NotifyAdminTelegramComponent)->sendNotification($message);

        return $club;
    }

    /**
     * @param ClubUpdateRequest $request
     * @param Club $club
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function update(ClubUpdateRequest $request, Club $club)
    {
        $this->authorize('update', $club);

        $this->clubs->update($club, collect($request->all()));

        return $this->success();
    }

    /**
     * @param FileUploadRequest $request
     * @param Club $club
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadFiles(FileUploadRequest $request, Club $club): array
    {
        $this->authorize('update', $club);

        try {
            $this->clubs->saveAttachments(
                $club,
                $request->allFiles(),
                $request->get('collection')
            );

            return $this->success(
                $this->clubs::UPLOAD_FILE_SUCCESS
            );
        } catch (\Exception $exception) {
            return $this->fail(
                $this->clubs::UPLOAD_FILE_FAILED
            );
        }
    }

    /**
     * @param FileDeleteRequest $request
     * @param Club $club
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function deleteFile(FileDeleteRequest $request, Club $club)
    {
        $this->authorize('update', $club);

        try {
            $this->clubs->deleteFile(
                $club,
                $request->get('file_id')
            );
            return $this->success(
                $this->clubs::DELETE_FILE_SUCCESS
            );
        } catch (\Exception $exception) {
            return $this->fail(
                $this->clubs::DELETE_FILE_FAILED
            );
        }
    }

    /**
     * @param Club $club
     * @param EventCreateRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function createEvent(Club $club, EventCreateRequest $request)
    {
        $this->authorize('create', Event::class);
        $event = $this->events->store($club, collect($request->all()));

        $message = 'A new event had been registered for moderation '.rtrim(env('APP_URL'),'/').'/clubs/'.$event->club_id.'/events/'.$event->id;
        (new NotifyAdminTelegramComponent)->sendNotification($message);

        return $event;
    }

    /**
     * @param EventUpdateRequest $request
     * @param Event $event
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function updateEvent(EventUpdateRequest $request, Event $event)
    {
        $this->authorize('update', $event);

        $response = $this->events->update($event, collect($request->all()));

        return $response ? $this->success() : $this->fail();
    }

    /**
     * @param Club $club
     * @param SyncServicesRequest $request
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function syncServices(Club $club, SyncServicesRequest $request)
    {
        $this->authorize('create', Service::class);

        $this->services->sync($club, collect($request->all()));

        return $this->success();
    }

    /**
     * @param Club $club
     * @param SyncPricesRequest $request
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function syncPrices(Club $club, SyncPricesRequest $request)
    {
        $this->authorize('create', PriceType::class);

        $this->prices->sync($club, collect($request->all()));

        return $this->success();

    }

    public function favorite(Club $club)
    {
        $club->favorite();
    }

    public function unfavorite(Club $club)
    {
        $club->unfavorite();
    }

    /**
     * @param ClubScheduleCreateRequest $request
     * @return array
     */
    public function schedule(ClubScheduleCreateRequest $request)
    {
//        $this->authorize('create-schedule', Club::class);

        $schedules = $request->all()['input'];

        try {
            foreach($schedules as $schedule) {
                $this->clubs->storeSchedule(collect($schedule));
            }

            return $this->success();

        } catch (\Exception $exception) {
            return $this->fail();
        }
    }

    /**
     * @param \Modules\Api\Http\Requests\Schedule\ClubScheduleUpdateRequest $request
     * @return array
     */
    public function updateSchedule(ClubScheduleUpdateRequest $request)
    {
//        $this->authorize('create-schedule', Club::class);

        $schedules = $request->all()['input'];

        try {
            foreach($schedules as $schedule) {
                $this->clubs->updateSchedule(collect($schedule));
            }

            return $this->success();

        } catch (\Exception $exception) {
            return $this->fail();
        }
    }
}

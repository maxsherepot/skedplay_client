<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Club\ClubCreateRequest;
use Modules\Api\Http\Requests\Club\ClubUpdateRequest;
use Modules\Api\Http\Requests\Common\SyncPricesRequest;
use Modules\Api\Http\Requests\Common\SyncServicesRequest;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Api\Http\Requests\FileDeleteRequest;
use Modules\Api\Http\Requests\FileUploadRequest;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\PriceType;
use Modules\Common\Entities\Service;
use Modules\Common\Repositories\PriceRepository;
use Modules\Common\Repositories\ServiceRepository;
use Modules\Events\Entities\Event;
use Modules\Main\Repositories\EventRepository;
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
     * @var EventRepository
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

    public function __construct(ClubRepository $clubs, EventRepository $events, ServiceRepository $services, PriceRepository $prices)
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
     */
    public function create(ClubCreateRequest $request)
    {
        $this->authorize('create', Club::class);

        return $this->clubs->store($request->user('api'), collect($request->all()));
    }

    /**
     * @param ClubUpdateRequest $request
     * @param Club $club
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
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
    public function uploadFile(FileUploadRequest $request, Club $club)
    {
        $this->authorize('update', $club);

        try {
            $this->clubs->saveFile(
                $club,
                $request->file('file'),
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

        return $this->events->store($club, collect($request->all()));
    }

    /**
     * @param Club $club
     * @param SyncServicesRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function syncServices(Club $club, SyncServicesRequest $request)
    {
        $this->authorize('create', Service::class);

        return $this->services->sync($club, collect($request->all()));
    }

    /**
     * @param Club $club
     * @param SyncPricesRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function syncPrices(Club $club, SyncPricesRequest $request)
    {
        $this->authorize('create', PriceType::class);

        return $this->prices->sync($club, collect($request->all()));
    }

    public function favorite(Club $club)
    {
        $club->favorite();
    }

    public function unfavorite(Club $club)
    {
        $club->unfavorite();
    }
}

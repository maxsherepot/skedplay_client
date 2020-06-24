<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Common\ContactRequestCreateRequest;
use Modules\Api\Http\Requests\Common\SyncPricesRequest;
use Modules\Api\Http\Requests\Common\SyncServicesRequest;
use Modules\Api\Http\Requests\Employee\EmployeeComplaintCreateRequest;
use Modules\Api\Http\Requests\Employee\EmployeeCreateRequest;
use Modules\Api\Http\Requests\Employee\EmployeeUpdateCurrentPositionRequest;
use Modules\Api\Http\Requests\Employee\EmployeeUpdateRequest;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Api\Http\Requests\Event\EventUpdateRequest;
use Modules\Api\Http\Requests\FileDeleteRequest;
use Modules\Api\Http\Requests\FileUploadRequest;
use Modules\Api\Http\Requests\Review\ReviewCreateRequest;
use Modules\Api\Http\Requests\Schedule\EmployeeScheduleCreateRequest;
use Modules\Api\Http\Requests\Schedule\EmployeeScheduleUpdateRequest;
use Modules\Common\Entities\ContactRequest;
use Modules\Common\Entities\PriceType;
use Modules\Common\Entities\Service;
use Modules\Common\Repositories\PriceRepository;
use Modules\Common\Repositories\ServiceRepository;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeComplaint;
use Modules\Employees\Repositories\EmployeeRepository;
use Modules\Events\Entities\Event;
use Modules\Main\Repositories\EventRepository;
use Nwidart\Modules\Routing\Controller;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class EmployeeController extends Controller
{
    use Statusable;

    /**
     * @var EmployeeRepository
     */
    private $employees;

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

    public function __construct(EmployeeRepository $employees, EventRepository $events, ServiceRepository $services, PriceRepository $prices)
    {
        $this->employees = $employees;
        $this->events = $events;
        $this->services = $services;
        $this->prices = $prices;
    }

    /**
     * @param EmployeeUpdateRequest $request
     * @param Employee $employee
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Exception
     */
    public function create(EmployeeCreateRequest $request)
    {
//      $this->authorize('create');
        return $this->employees->create(collect($request->all()));
    }

    /**
     * @param EmployeeUpdateRequest $request
     * @param Employee $employee
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(EmployeeUpdateRequest $request, Employee $employee)
    {
        $this->authorize('update', $employee);

        $this->employees->update($employee, collect($request->all()));

        return $this->success();
    }

    /**
     * @param Employee $employee
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function delete(Employee $employee)
    {
        $this->authorize('delete', $employee);

        $id = (string) $employee->id;

        $response = $this->employees->delete($employee);

        // Передача id в контексте message, служит для фильтрации и обновления кеша на стороне Apollo.
        return $response ? $this->success($id) : $this->fail();
    }

    /**
     * @param Employee $employee
     * @param EventCreateRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function createEvent(Employee $employee, EventCreateRequest $request)
    {
        $this->authorize('create', Event::class);

        return $this->events->store($employee, collect($request->all()));
    }

    /**
     * @param EventUpdateRequest $request
     * @param Event $event
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
     */
    public function updateEvent(EventUpdateRequest $request, Event $event)
    {
        $this->authorize('update', $event);

        $response = $this->events->update($event, collect($request->all()));

        return $response ? $this->success() : $this->fail();
    }

    /**
     * @param Employee $employee
     * @param SyncServicesRequest $request
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function syncServices(Employee $employee, SyncServicesRequest $request)
    {
//        $this->authorize('create', Service::class);

        $this->services->sync($employee, collect($request->all()));

        return $this->success();
    }

    /**
     * @param Employee $employee
     * @param SyncPricesRequest $request
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function syncPrices(Employee $employee, SyncPricesRequest $request)
    {
//        $this->authorize('create', PriceType::class);

        $this->prices->sync($employee, collect($request->all()));

        return $this->success();
    }

    /**
     * @param FileUploadRequest $request
     * @param Employee $employee
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadFiles(FileUploadRequest $request, Employee $employee)
    {
        $this->authorize('update', $employee);

        $customProperties = $request->get('custom_properties', []);

        try {
            $this->employees->saveAttachments(
                $employee,
                $request->allFiles(),
                $request->get('collection'),
                $customProperties
            );

            return $this->success(
                $this->employees::UPLOAD_FILE_SUCCESS
            );
        } catch (\Exception $exception) {
            return $this->fail(
                $this->employees::UPLOAD_FILE_FAILED
            );
        }
    }

    /**
     * @param FileDeleteRequest $request
     * @param Employee $employee
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function deleteFile(FileDeleteRequest $request, Employee $employee): ?array
    {
        $this->authorize('update', $employee);

        try {
            $this->employees->deleteFile(
                $employee,
                $request->get('file_id')
            );

            return $this->success(
                $this->employees::DELETE_FILE_SUCCESS
            );
        } catch (\Exception $exception) {
            return $this->fail(
                $this->employees::DELETE_FILE_FAILED
            );
        }
    }

    public function favorite(Employee $employee): void
    {
        $employee->favorite();
    }

    public function unfavorite(Employee $employee): void
    {
        $employee->unfavorite();
    }

  /**
   * @param EmployeeScheduleCreateRequest $request
   * @return array
   * @throws \Illuminate\Auth\Access\AuthorizationException
   */
    public function schedule(EmployeeScheduleCreateRequest $request): ?array
    {
//        $this->authorize('create-schedule', Club::class);
        $schedules = $request->all()['input']['schedules'];
        $willActivateAt = $request->all()['input']['will_activate_at'];

        try {
            foreach ($schedules as $schedule) {
                $this->employees->storeSchedule(collect($schedule));
            }

            $this->employees->storeActivatedAt($schedules[0]['employee_id'], Carbon::parse($willActivateAt));

            return $this->success();

        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->fail();
        }
    }

    /**
     * @param \Modules\Api\Http\Requests\Schedule\ClubScheduleUpdateRequest $request
     * @return array
     */
    public function updateSchedule(EmployeeScheduleUpdateRequest $request): ?array
    {
//        $this->authorize('create-schedule', Employee::class);

        $schedules = $request->all()['input']['schedules'];
        $willActivateAt = $request->all()['input']['will_activate_at'];

        try {
            foreach($schedules as $schedule) {
                $this->employees->updateSchedule(collect($schedule));
            }

            $this->employees->storeActivatedAt($schedules[0]['employee_id'], Carbon::parse($willActivateAt));

            return $this->success();

        } catch (\Exception $exception) {
            return $this->fail();
        }
    }

    public function createReview(ReviewCreateRequest $request, Employee $employee)
    {
        return $this->employees->storeReview($employee, collect($request->all()));
    }

    public function updateCurrentPosition(EmployeeUpdateCurrentPositionRequest $request, Employee $employee)
    {
        $this->authorize('update', $employee);

        $this->employees->storeCurrentPosition($employee, collect($request->validated()));

        return $this->success();
    }

    public function employeeComplaintCreate(EmployeeComplaintCreateRequest $request)
    {
        $data = $request->validated();

        if (auth('api')->check()) {
            $data['name'] = auth('api')->user()->name;
            $data['email'] = auth('api')->user()->email;
        }

        return EmployeeComplaint::create($data);
    }
}

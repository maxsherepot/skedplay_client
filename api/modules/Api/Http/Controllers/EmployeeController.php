<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Carbon\Carbon;
use Modules\Api\Http\Requests\Employee\EmployeeComplaintCreateRequest;
use Modules\Api\Http\Requests\Employee\EmployeeUpdateCurrentPositionRequest;
use Modules\Events\Entities\Event;
use Illuminate\Support\Facades\Log;
use Nwidart\Modules\Routing\Controller;
use Modules\Employees\Entities\Employee;
use Modules\Api\Http\Requests\FileDeleteRequest;
use Modules\Api\Http\Requests\FileUploadRequest;
use Modules\Common\Repositories\PriceRepository;
use Modules\Employees\Entities\EmployeeComplaint;
use Modules\Common\Repositories\ServiceRepository;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Employees\Repositories\EmployeeRepository;
use Modules\Api\Http\Requests\Common\SyncPricesRequest;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Api\Http\Requests\Event\EventUpdateRequest;
use Modules\Api\Http\Requests\Common\SyncServicesRequest;
use Modules\Api\Http\Requests\Review\ReviewCreateRequest;
use Modules\Employees\Services\EmployeeNotificationSender;
use Modules\Api\Http\Requests\Employee\EmployeeCreateRequest;
use Modules\Api\Http\Requests\Employee\EmployeeUpdateRequest;
use Modules\Api\Http\Requests\Schedule\EmployeeScheduleCreateRequest;
use Modules\Api\Http\Requests\Schedule\EmployeeScheduleUpdateRequest;
use Modules\Main\Repositories\EmployeeEventRepository;
use Modules\Users\Entities\User;

class EmployeeController extends Controller
{
    use Statusable;

    /**
     * @var EmployeeRepository
     */
    private $employees;

    /**
     * @var EmployeeEventRepository
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

    private $employeeNotificationSender;

    public function __construct(EmployeeRepository $employees, EmployeeEventRepository $events, ServiceRepository $services, PriceRepository $prices, EmployeeNotificationSender $employeeNotificationSender)
    {
        $this->employees = $employees;
        $this->events = $events;
        $this->services = $services;
        $this->prices = $prices;
        $this->employeeNotificationSender = $employeeNotificationSender;
    }

    /**
     * @param EmployeeCreateRequest $request
     * @return array
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

        $this->employeeNotificationSender->updateProfile($employee);

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
     * @param EventCreateRequest $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
     */
    public function createEvent(EventCreateRequest $request)
    {
        /** @var User $user */
        $user = auth('api')->user();

        $this->authorize('create', Event::class);

        return $this->events->store($user, collect($request->all()));
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

        if ($response) {
            $this->employeeNotificationSender->updateEvent($event->owner, $event);
            return $this->success();
        }

        return $this->fail();
    }

    /**
     * @param Employee $employee
     * @param SyncServicesRequest $request
     * @return array
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

            $this->employeeNotificationSender->addedNewPhotoOrVideo($employee);

            return $this->success(
                $this->employees::UPLOAD_FILE_SUCCESS
            );


        } catch (\Exception $exception) {
            Log::error($exception->getMessage(), [$exception->getFile(), $exception->getLine()]);

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
    public function deleteFile(FileDeleteRequest $request, Employee $employee)
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

    public function favorite(Employee $employee)
    {
        $employee->favorite();
    }

    public function unfavorite(Employee $employee)
    {
        $employee->unfavorite();
    }

  /**
   * @param EmployeeScheduleCreateRequest $request
   * @return array
   * @throws \Illuminate\Auth\Access\AuthorizationException
   */
    public function schedule(EmployeeScheduleCreateRequest $request)
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
     * @param EmployeeScheduleUpdateRequest $request
     * @return array
     */
    public function updateSchedule(EmployeeScheduleUpdateRequest $request)
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

        $this->employeeNotificationSender->updatePosition($employee);

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

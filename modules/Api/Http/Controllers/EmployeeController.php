<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Employee\EmployeeUpdateRequest;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Api\Http\Requests\FileDeleteRequest;
use Modules\Api\Http\Requests\FileUploadRequest;
use Modules\Common\Entities\PriceType;
use Modules\Common\Entities\Service;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Repositories\EmployeeRepository;
use Modules\Events\Entities\Event;
use Modules\Main\Repositories\EventRepository;
use Nwidart\Modules\Routing\Controller;

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

    public function __construct(EmployeeRepository $employees, EventRepository $events)
    {
        $this->employees = $employees;
        $this->events = $events;
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
     * @param Employee $employee
     * @param Request $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function syncServices(Employee $employee, Request $request)
    {
        $this->authorize('create', Service::class);

        return $this->employees->syncServices($employee, collect($request->all()));
    }

    /**
     * @param Employee $employee
     * @param Request $request
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function syncPrices(Employee $employee, Request $request)
    {
        $this->authorize('create', PriceType::class);

        return $this->employees->syncPrices($employee, collect($request->all()));
    }

    /**
     * @param FileUploadRequest $request
     * @param Employee $employee
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadFile(FileUploadRequest $request, Employee $employee)
    {
        $this->authorize('update', $employee);

        try {
            $this->employees->saveFile($employee, $request->file('file'), $request->get('collection'));
            return $this->success();
        } catch (\Exception $exception) {
            return $this->fail();
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
            $this->employees->deleteFile($employee, $request->get('file_id'));
            return $this->success();
        } catch (\Exception $exception) {
            return $this->fail();
        }
    }
}

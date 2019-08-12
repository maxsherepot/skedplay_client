<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Employee\EmployeeUpdateRequest;
use Modules\Api\Http\Requests\Event\EventCreateRequest;
use Modules\Api\Http\Requests\UploadPhotoRequest;
use Modules\Api\Http\Requests\UploadVideoRequest;
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
     * @param UploadPhotoRequest $request
     * @param Employee $employee
     * @return void
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadPhoto(UploadPhotoRequest $request, Employee $employee)
    {
        $this->authorize('update', $employee);

        $this->employees->saveFile($employee, $request->file('file'), 'photos');
    }

    /**
     * @param UploadVideoRequest $request
     * @param Employee $employee
     * @return void
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function uploadVideo(UploadVideoRequest $request, Employee $employee)
    {
        $this->authorize('update', $employee);

        $this->employees->saveFile($employee, $request->file('file'), 'videos');
    }
}

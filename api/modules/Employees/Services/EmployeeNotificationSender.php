<?php

namespace Modules\Employees\Services;

use Modules\Events\Entities\Event;
use Modules\Employees\Entities\Employee;
use Illuminate\Support\Facades\Notification;
use Modules\Common\Entities\SubscribeEmployee;
use Modules\Employees\Notifications\CreateEventNotification;
use Modules\Employees\Notifications\UpdateEventNotification;
use Modules\Employees\Notifications\UpdateProfileNotification;
use Modules\Employees\Notifications\UpdatePositionNotification;
use Modules\Employees\Notifications\AddedNewPhotoOrVideoNotification;

class EmployeeNotificationSender
{

    public function createEvent(Employee $employee, Event $event)
    {
        Notification::send($employee->subscribers, new CreateEventNotification($employee, $event));
    }

    public function updateEvent(Employee $employee, Event $event)
    {
        Notification::send($employee->subscribers, new UpdateEventNotification($employee, $event));
    }

    public function updateProfile(Employee $employee)
    {
        Notification::send($employee->subscribers, new UpdateProfileNotification($employee));
    }

    public function updatePosition(Employee $employee)
    {
        Notification::send($employee->subscribers, new UpdatePositionNotification($employee));
    }

    public function addedNewPhotoOrVideo(Employee $employee)
    {
        Notification::send($employee->subscribers, new AddedNewPhotoOrVideoNotification($employee));
    }

}

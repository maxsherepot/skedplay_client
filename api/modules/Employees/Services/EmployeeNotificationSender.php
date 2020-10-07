<?php

namespace Modules\Employees\Services;

use Modules\Events\Entities\Event;
use Modules\Employees\Entities\Employee;
use Illuminate\Support\Facades\Notification;
use Modules\Employees\Notifications\CreateEventNotification;
use Modules\Employees\Notifications\UpdateEventNotification;
use Modules\Employees\Notifications\AddedNewPhotoOrVideoNotification;
use Modules\Employees\Notifications\UpdateContactNotification;
use Modules\Employees\Notifications\ProfileActivatedNotification;

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

    public function updateContact(Employee $employee)
    {
        Notification::send($employee->subscribers, new UpdateContactNotification($employee));
    }

    public function profileActivated(Employee $employee)
    {
        Notification::send($employee->subscribers, new ProfileActivatedNotification($employee));
    }

    public function addedNewPhotoOrVideo(Employee $employee)
    {
        Notification::send($employee->subscribers, new AddedNewPhotoOrVideoNotification($employee));
    }

}

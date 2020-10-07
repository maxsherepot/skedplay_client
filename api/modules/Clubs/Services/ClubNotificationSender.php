<?php

namespace Modules\Clubs\Services;

use Modules\Clubs\Entities\Club;
use Modules\Events\Entities\Event;
use Illuminate\Support\Facades\Notification;
use Modules\Clubs\Notifications\CreateEventNotification;
use Modules\Clubs\Notifications\UpdateEventNotification;
use Modules\Clubs\Notifications\UpdateProfileNotification;
use Modules\Clubs\Notifications\UpdateContactNotification;
use Modules\Clubs\Notifications\NewEmployeeNotification;
use Modules\Employees\Entities\Employee;

class ClubNotificationSender
{

    public function createEvent(Club $club, Event $event)
    {
        Notification::send($club->subscribers, new CreateEventNotification($club, $event));
    }

    public function updateEvent(Club $club, Event $event)
    {
        Notification::send($club->subscribers, new UpdateEventNotification($club, $event));
    }

    public function updateContact(Club $club)
    {
        Notification::send($club->subscribers, new UpdateContactNotification($club));
    }

    public function newEmployee(Club $club, Employee $employee)
    {
        Notification::send($club->subscribers, new NewEmployeeNotification($club, $employee));
    }

}

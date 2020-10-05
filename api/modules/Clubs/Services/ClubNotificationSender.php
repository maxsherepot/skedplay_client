<?php

namespace Modules\Clubs\Services;

use Modules\Clubs\Entities\Club;
use Modules\Events\Entities\Event;
use Illuminate\Support\Facades\Log;
use Modules\Common\Entities\SubscribeClub;
use Illuminate\Support\Facades\Notification;
use Modules\Clubs\Notifications\CreateEventNotification;
use Modules\Clubs\Notifications\UpdateEventNotification;
use Modules\Clubs\Notifications\UpdateProfileNotification;

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

    public function updateProfile(Club $club)
    {
        Notification::send($club->subscribers, new UpdateProfileNotification($club));
    }

}

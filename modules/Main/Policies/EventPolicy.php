<?php declare(strict_types=1);

namespace Modules\Main\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Main\Entities\Event;
use Modules\Users\Entities\User;

class EventPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('create-events');
    }

    /**
     * @param User $user
     * @param Event $event
     * @return bool
     */
    public function update(User $user, Event $event): bool
    {
        if ($event->eventable_type === 'club') {
            return $user->clubs->contains($event->eventable_id);
        }

        return $user->owns($event, 'eventable_id') && $user->hasPermission('update-events');
    }
}
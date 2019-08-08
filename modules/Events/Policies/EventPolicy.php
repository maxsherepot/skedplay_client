<?php declare(strict_types=1);

namespace Modules\Events\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\Permission;
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
        return $user->hasPermission(Permission::EVENTS_CREATE);
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

        return $user->owns($event, 'eventable_id') && $user->hasPermission(Permission::EVENTS_UPDATE);
    }

    /**
     * @param User $user
     * @param Event $event
     * @return bool
     */
    public function delete(User $user, Event $event): bool
    {
//        dd($user);
//        dd($user->roles()->get());
        if ($event->eventable_type === 'club') {
            return $user->clubs->contains($event->eventable_id);
        }

        // Girl | Not User
        return $user->owns($event, 'eventable_id') && $user->hasPermission(Permission::EVENTS_DELETE);
    }
}

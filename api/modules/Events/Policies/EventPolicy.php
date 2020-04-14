<?php declare(strict_types=1);

namespace Modules\Events\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class EventPolicy
{
    use HandlesAuthorization;

    public function view(User $user): bool
    {
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_MODERATOR))
            && $user->hasPermission(Permission::READ_EVENTS);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN) && $user->hasPermission(Permission::CREATE_EVENTS);
    }

    /**
     * @param User $user
     * @param Event $event
     * @return bool
     */
    public function update(User $user, Event $event): bool
    {
        return ($user->hasRole(User::ACCOUNT_ADMIN) || $user->hasRole(User::ACCOUNT_MODERATOR))
            && $user->hasPermission(Permission::UPDATE_EVENTS);
    }

    /**
     * @param User $user
     * @param Event $event
     * @return bool
     */
    public function delete(User $user, Event $event): bool
    {
        return $user->hasRole(User::ACCOUNT_ADMIN) && $user->hasPermission(Permission::DELETE_EVENTS);
    }

    private function checkUserCan(User $user, Event $event): bool
    {
        return $user->events_club_owners->contains($event->id) || $this->checkUserEmployeeOwner($user, $event);
    }

    private function checkUserEmployeeOwner(User $user, Event $event): bool
    {
        return $event->owner_type === 'employee'
            && $user->is_employee
            && $event->owner_id === $user->employee->id;
    }
}

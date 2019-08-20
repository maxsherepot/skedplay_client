<?php

namespace Modules\Billing\Events;

use Illuminate\Queue\SerializesModels;
use Modules\Users\Entities\User;

class SubscribeOnPlanEvent
{
    use SerializesModels;

    public $plan_id;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param int $plan_id
     */
    public function __construct(User $user, int $plan_id)
    {
        $this->plan_id = $plan_id;
        $this->user = $user;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}

<?php

namespace Modules\Billing\Events;

use Illuminate\Queue\SerializesModels;
use Modules\Billing\Entities\Order;
use Modules\Users\Entities\User;

class PaymentCompleteEvent
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
     * @param Order $order
     */
    public function __construct(Order $order)
    {
        $this->plan_id = $order->plan_id;
        $this->user = $order->user;
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

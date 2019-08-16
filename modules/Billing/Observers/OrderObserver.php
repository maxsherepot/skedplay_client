<?php

namespace Modules\Billing\Observers;

use Modules\Billing\Entities\Order;
use Modules\Users\Entities\User;

class OrderObserver
{
    /**
     * Handle the Order "updated" event.
     *
     * @param Order $order
     * @return void
     */
    public function updated(Order $order)
    {
        if ($order->isDirty('payment_status') && $order->paid()) {
            /** @var User $user */
            $user = $order->user;

            $user->newSubscription('main', $order->plan_id)
                ->create();
        }
    }
}

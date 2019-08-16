<?php

namespace Modules\Billing\Observers;

use Modules\Billing\Entities\Order;
use Modules\Billing\Events\PaymentCompleteEvent;

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
            event(new PaymentCompleteEvent($order));
        }
    }
}

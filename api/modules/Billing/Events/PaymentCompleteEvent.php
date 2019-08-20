<?php

namespace Modules\Billing\Events;

use Illuminate\Queue\SerializesModels;
use Modules\Billing\Entities\Invoice;
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
     * @param Invoice $invoice
     */
    public function __construct(Invoice $invoice)
    {
        $this->plan_id = $invoice->plan_id;
        $this->user = $invoice->user;
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

<?php

namespace Modules\Billing\Observers;

use Modules\Billing\Entities\Invoice;
use Modules\Billing\Events\PaymentCompleteEvent;

class InvoiceObserver
{
    /**
     * Handle the Invoice "updated" event.
     *
     * @param Invoice $invoice
     * @return void
     */
    public function updated(Invoice $invoice)
    {
        if ($invoice->isDirty('payment_status') && $invoice->paid()) {
            event(new PaymentCompleteEvent($invoice));
        }
    }
}

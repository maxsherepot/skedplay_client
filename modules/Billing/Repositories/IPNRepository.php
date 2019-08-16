<?php

namespace Modules\Billing\Repositories;

use Illuminate\Http\Request;
use Modules\Billing\Entities\Invoice;
use Modules\Billing\Entities\PayPalIPN;

class IPNRepository
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * @param $event
     * @param $verified
     * @param Invoice $invoice
     */
    public function handle($event, $verified, Invoice $invoice)
    {
        /** @var \PayPal\IPN\IPNMessage $object */
        $object = $event->getMessage();

        /** @var PayPalIPN $paypal */
        $paypal = PayPalIPN::create([
            'verified'        => $verified,
            'transaction_id'  => $object->get('txn_id'),
            'invoice_id'      => $invoice ? $invoice->id : null,
            'payment_status'  => $object->get('payment_status'),
            'request_method'  => $this->request->method(),
            'request_url'     => $this->request->url(),
            'request_headers' => json_encode($this->request->header()),
            'payload'         => json_encode($this->request->all()),
        ]);

        if ($paypal->isVerified() && $paypal->isCompleted()) {
            if ($invoice && $invoice->unpaid()) {
                $invoice->update([
                    'payment_status' => $invoice::COMPLETED,
                    'transaction_id' => $object->get('txn_id')
                ]);
            }
        }
    }
}
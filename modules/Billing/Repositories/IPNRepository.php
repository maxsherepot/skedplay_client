<?php

namespace Modules\Billing\Repositories;

use Illuminate\Http\Request;
use Modules\Billing\Entities\Order;
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
     * @param Order $order
     */
    public function handle($event, $verified, Order $order)
    {
        /** @var \PayPal\IPN\IPNMessage $object */
        $object = $event->getMessage();

        /** @var PayPalIPN $paypal */
        $paypal = PayPalIPN::create([
            'verified'        => $verified,
            'transaction_id'  => $object->get('txn_id'),
            'order_id'        => $order ? $order->id : null,
            'payment_status'  => $object->get('payment_status'),
            'request_method'  => $this->request->method(),
            'request_url'     => $this->request->url(),
            'request_headers' => json_encode($this->request->header()),
            'payload'         => json_encode($this->request->all()),
        ]);

        if ($paypal->isVerified() && $paypal->isCompleted()) {
            if ($order && $order->unpaid()) {
                $order->update([
                    'payment_status' => $order::COMPLETED,
                    'transaction_id' => $object->get('txn_id')
                ]);
            }
        }
    }
}
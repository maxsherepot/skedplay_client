<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Modules\Main\Services\Cashier\Order;
use Modules\Main\Services\Cashier\PaymentInterface;

class PaymentController extends Controller
{
    /**
     * @var PaymentInterface
     */
    private $payment;

    public function __construct(PaymentInterface $payment)
    {
        $this->payment = $payment;
    }

    /**
     * @param Order $order
     * @return mixed
     */
    public function completed(Order $order)
    {
        $response = $this->payment->complete([
            'amount'        => $order->amount,
            'transactionId' => $order->transaction_id,
            'currency'      => 'USD',
            'cancelUrl'     => $this->payment->getCancelUrl($order),
            'returnUrl'     => $this->payment->getReturnUrl($order),
            'notifyUrl'     => $this->payment->getNotifyUrl($order),
        ]);

        if ($response->isSuccessful()) {
            $order->update([
                'transaction_id' => $response->getTransactionReference(),
                'payment_status' => Order::PAYMENT_COMPLETED,
            ]);

            // Todo: Mb this swap plan in order->plan_id?

            Log::info(
                'You recent payment is sucessful with reference code ' . $response->getTransactionReference()
            );
        }
        Log::info('Completed message' . $response->getMessage());
    }

    /**
     * @param Order $order
     * @return void
     */
    public function cancelled(Order $order)
    {
        Log::info('You have cancelled your recent PayPal payment !', $order->toArray());
    }

    /**
     * @param Order $order
     * @param $env
     * @param Request $request
     */
    public function webhook(Order $order, $env, Request $request)
    {
        // paypal-ipn
    }
}

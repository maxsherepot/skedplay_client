<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Billing\CompletedRequest;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Order;
use Modules\Billing\Repositories\OrderRepository;
use Nwidart\Modules\Routing\Controller;

class BillingController extends Controller
{
    use Statusable;

    /**
     * @var PaymentGatewayInterface
     */
    private $payment;
    /**
     * @var OrderRepository
     */
    private $orders;

    /**
     * PlanController constructor.
     * @param PaymentGatewayInterface $payment
     * @param OrderRepository $orders
     */
    public function __construct(PaymentGatewayInterface $payment, OrderRepository $orders)
    {
        $this->payment = $payment;
        $this->orders = $orders;
    }

    /**
     * @param Order $order
     * @param CompletedRequest $request
     * @return mixed
     */
    public function completed(Order $order, CompletedRequest $request)
    {
        $response = $this->payment->complete([
            'token'         => $request->get('token'),
            'payerId'       => $request->get('payerId'),
            'amount'        => $order->amount,
            'transactionId' => $order->transaction_id,
            'currency'      => 'USD', // Todo: Get Cashier current currency
            'cancelUrl'     => $this->payment->getCancelUrl($order),
            'returnUrl'     => $this->payment->getReturnUrl($order),
            'notifyUrl'     => $this->payment->getNotifyUrl($order),
        ]);

        if ($response->isSuccessful()) {
            // Todo: Mb this swap plan in order->plan_id?
            $order->update([
                'transaction_id' => $response->getTransactionReference(),
                'payment_status' => Order::PAYMENT_COMPLETED,
            ]);
            return $this->success();
        }

        Log::info('Completed error: ' . $response->getMessage());

        return $this->fail();
    }

}

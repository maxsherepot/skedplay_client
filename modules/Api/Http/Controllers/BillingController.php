<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Billing\CompletedRequest;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Invoice;
use Modules\Billing\Repositories\InvoiceRepository;
use Modules\Billing\Services\Cashier;
use Nwidart\Modules\Routing\Controller;

class BillingController extends Controller
{
    use Statusable;

    /**
     * @var PaymentGatewayInterface
     */
    private $payment;
    /**
     * @var InvoiceRepository
     */
    private $invoices;

    /**
     * PlanController constructor.
     * @param PaymentGatewayInterface $payment
     */
    public function __construct(PaymentGatewayInterface $payment)
    {
        $this->payment = $payment;
    }

    /**
     * @param Invoice $invoice
     * @param CompletedRequest $request
     * @return array
     */
    public function completed(Invoice $invoice, CompletedRequest $request)
    {
        try {
            $response = $this->payment->complete([
                'token'         => $request->get('token'),
                'payerId'       => $request->get('payerId'),
                'amount'        => Cashier::formatAmount($invoice->amount),
                'transactionId' => $invoice->transaction_id,
                'currency'      => Cashier::usesCurrency(),
                'cancelUrl'     => $this->payment->getCancelUrl($invoice),
                'returnUrl'     => $this->payment->getReturnUrl($invoice),
                'notifyUrl'     => $this->payment->getNotifyUrl($invoice),
            ]);

            if ($response->isSuccessful()) {
                $invoice->update([
                    'transaction_id' => $response->getTransactionReference(),
                    'payment_status' => Invoice::PENDING,
                ]);
                return $this->success();
            }
        } catch (\Exception $exception) {
            Log::info('Completed error: ' . $exception->getMessage());
        }
        return $this->fail();
    }
}

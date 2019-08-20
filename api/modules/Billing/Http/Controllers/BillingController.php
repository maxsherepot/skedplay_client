<?php declare(strict_types=1);

namespace Modules\Billing\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Invoice;
use Modules\Billing\Entities\Transaction;
use Modules\Billing\Http\Requests\CompletedRequest;
use Modules\Billing\Repositories\TransactionRepository;
use Modules\Billing\Services\Cashier;

class BillingController extends Controller
{
    use Statusable;

    /**
     * @var TransactionRepository
     */
    private $repository;
    /**
     * @var Request
     */
    private $request;

    public function __construct(TransactionRepository $repository, Request $request)
    {
        $this->repository = $repository;
        $this->request = $request;
    }

    /**
     * @param Transaction $transaction
     * @param CompletedRequest $request
     * @return array
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function completed(Transaction $transaction, CompletedRequest $request)
    {
        $payment = app()->make(
            Invoice::getPayment($transaction->payment_method)
        );

        try {
            /** @var PaymentGatewayInterface $payment */
            $response = $payment->complete([
                'token'         => $request->get('token'),
                'payerId'       => $request->get('payerId'),
                'amount'        => Cashier::formatAmount($transaction->invoice->amount),
                'transactionId' => $transaction->id,
                'currency'      => Cashier::usesCurrency(),
                'cancelUrl'     => $payment->getCancelUrl($transaction),
                'returnUrl'     => $payment->getReturnUrl($transaction),
                'notifyUrl'     => $payment->getNotifyUrl($transaction),
            ]);

            if ($response->isSuccessful()) {
                $transaction->update([
                    'payment_txn_id' => $response->getTransactionReference(),
                    'status'         => Invoice::PENDING,
                ]);
                return $this->success();
            }
        } catch (\Exception $exception) {
            Log::info('Completed error: ' . $exception->getMessage());
        }
        return $this->fail();
    }

    /**
     * @param Transaction $transaction
     * @param $env
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function webhook(Transaction $transaction, $env)
    {
        $payment = app()->make(
            Invoice::getPayment($transaction->payment_method)
        );

        $payment->webhook($transaction, $env);
    }
}

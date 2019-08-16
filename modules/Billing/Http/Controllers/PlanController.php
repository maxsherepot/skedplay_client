<?php declare(strict_types=1);

namespace Modules\Billing\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Invoice;
use Modules\Billing\Entities\Plan;
use Modules\Billing\Entities\Transaction;
use Modules\Billing\Events\SubscribeOnPlanEvent;
use Modules\Billing\Http\Requests\CheckoutRequest;
use Modules\Billing\Repositories\InvoiceRepository;
use Modules\Billing\Repositories\TransactionRepository;
use Modules\Billing\Services\Cashier;
use Modules\Main\Repositories\EventRepository;
use Modules\Users\Entities\User;
use Nwidart\Modules\Routing\Controller;

class PlanController extends Controller
{
    use Statusable;

    /**
     * @var EventRepository
     */
    protected $events;
    /**
     * @var InvoiceRepository
     */
    private $invoices;
    /**
     * @var TransactionRepository
     */
    private $transactions;

    /**
     * PlanController constructor.
     * @param EventRepository $events
     * @param InvoiceRepository $invoices
     * @param TransactionRepository $transactions
     */
    public function __construct(EventRepository $events, InvoiceRepository $invoices, TransactionRepository $transactions)
    {
        $this->events = $events;
        $this->invoices = $invoices;
        $this->transactions = $transactions;
    }

    /**
     * @param Plan $plan
     * @param User $user
     * @return array
     */
    public function subscribe(Plan $plan, User $user): array
    {
        $invoiceId = null;

        if ($plan->price > 0) {
            $invoiceId = $this->newInvoice($plan, $user)->id;
        } else {
            event(new SubscribeOnPlanEvent($user, $plan->id));
        }

        return [
            'invoice_id' => $invoiceId,
        ];
    }

    /**
     * @param Invoice $invoice
     * @param CheckoutRequest $request
     * @return array
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function checkout(Invoice $invoice, CheckoutRequest $request): array
    {
        $url = null;
        $payment = null;
        $paymentMethod = $request->input('gateway');

        $payment = app()->make(
            Invoice::getPayment($paymentMethod)
        );
        $transaction = $this->newTransaction($invoice, $paymentMethod);

        try {
            /** @var PaymentGatewayInterface $payment */
            $response = $payment->purchase([
                'amount'        => Cashier::formatAmount($invoice->amount),
                'transactionId' => $transaction->id,
                'currency'      => Cashier::usesCurrency(),
                'cancelUrl'     => $payment->getCancelUrl($transaction),
                'returnUrl'     => $payment->getReturnUrl($transaction),
            ]);

            if ($response->isRedirect()) {
                $url = $response->getRedirectUrl();
            }
        } catch (\Exception $exception) {
            Log::info('Checkout error: ' . $exception->getMessage());
        }

        return [
            'redirect_url' => $url,
        ];
    }

    /**
     * @param Plan $plan
     * @param User $user
     * @return Invoice
     */
    protected function newInvoice(Plan $plan, User $user): Invoice
    {
        $data = collect([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'amount'  => $plan->price,
        ]);

        return $this->invoices->store($data);
    }

    /**
     * @param Invoice $invoice
     * @param string $payment_method
     * @return Transaction
     */
    protected function newTransaction(Invoice $invoice, string $payment_method): Transaction
    {
        $data = collect([
            'invoice_id'     => $invoice->id,
            'payment_method' => $payment_method,
        ]);

        return $this->transactions->store($data);
    }
}

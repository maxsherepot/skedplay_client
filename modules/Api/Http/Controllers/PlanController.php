<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Billing\CheckoutRequest;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Invoice;
use Modules\Billing\Entities\Plan;
use Modules\Billing\Events\SubscribeOnPlanEvent;
use Modules\Billing\Repositories\InvoiceRepository;
use Modules\Billing\Services\Cashier;
use Modules\Billing\Services\Gateway\PayPal;
use Modules\Main\Repositories\EventRepository;
use Modules\Users\Entities\User;
use Nwidart\Modules\Routing\Controller;

class PlanController extends Controller
{
    use Statusable;

    /**
     * @var PaymentGatewayInterface
     */
    private $payment;
    /**
     * @var EventRepository
     */
    protected $events;
    /**
     * @var InvoiceRepository
     */
    private $invoices;

    /**
     * PlanController constructor.
     * @param EventRepository $repository
     * @param InvoiceRepository $invoices
     */
    public function __construct(EventRepository $repository, InvoiceRepository $invoices)
    {
        $this->events = $repository;
        $this->invoices = $invoices;
    }

    /**
     * @param Plan $plan
     * @param User $user
     * @return array
     */
    public function subscribe(Plan $plan, User $user): array
    {
        $invoiceId = null;

        switch ($plan->name) {
            case "personal":
            case "premium":
                $invoiceId = $this->newInvoice($plan, $user)->id;
                break;
            default:
            case "free":
                event(new SubscribeOnPlanEvent($user, $plan->id));
                break;
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

        switch ($request->input('gateway')) {
            case "sms":
//                $payment = app()->make(SmsGateway::class);
                break;
            case "paypal":
                $payment = app()->make(PayPal::class);
                break;
            default:
                break;
        }

        try {
            /** @var PaymentGatewayInterface $payment */
            $response = $payment->purchase([
                'amount'        => Cashier::formatAmount($invoice->amount),
                'transactionId' => $invoice->transaction_id,
                'currency'      => Cashier::usesCurrency(),
                'cancelUrl'     => $payment->getCancelUrl($invoice),
                'returnUrl'     => $payment->getReturnUrl($invoice),
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
            'user_id'        => $user->id,
            'transaction_id' => rand(10000000, 99999999),
            'plan_id'        => $plan->id,
            'amount'         => $plan->price,
        ]);

        return $this->invoices->store($data);
    }
}

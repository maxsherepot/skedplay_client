<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Invoice;
use Modules\Billing\Entities\Plan;
use Modules\Billing\Events\SubscribeOnPlanEvent;
use Modules\Billing\Repositories\InvoiceRepository;
use Modules\Billing\Services\Cashier;
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
     * @param PaymentGatewayInterface $payment
     * @param EventRepository $repository
     * @param InvoiceRepository $invoices
     */
    public function __construct(PaymentGatewayInterface $payment, EventRepository $repository, InvoiceRepository $invoices)
    {
        $this->events = $repository;
        $this->payment = $payment;
        $this->invoices = $invoices;
    }

    public function subscribe(Plan $plan, User $user)
    {
        $url = null;

        switch ($plan->name) {
            case "personal":
            case "premium":
                $url = $this->checkout(
                    $this->newInvoice($plan, $user)
                );
                break;
            default:
            case "free":
                event(new SubscribeOnPlanEvent($user, $this->getFreePlanId()));
                break;
        }

        return [
            'redirect_url' => $url,
        ];
    }

    protected function checkout(Invoice $invoice)
    {
        $url = null;

        try {
            $response = $this->payment->purchase([
                'amount'        => Cashier::formatAmount($invoice->amount),
                'transactionId' => $invoice->transaction_id,
                'currency'      => Cashier::usesCurrency(),
                'cancelUrl'     => $this->payment->getCancelUrl($invoice),
                'returnUrl'     => $this->payment->getReturnUrl($invoice),
            ]);

            if ($response->isRedirect()) {
                $url = $response->getRedirectUrl();
            }
        } catch (\Exception $exception) {
            Log::info('Checkout error: ' . $exception->getMessage());
        }

        return $url;
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

    /**
     * @return mixed
     */
    protected function getFreePlanId()
    {
        return Plan::where('name', 'free')->first()->id;
    }
}

<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Order;
use Modules\Billing\Entities\Plan;
use Modules\Billing\Events\SubscribeOnPlanEvent;
use Modules\Billing\Repositories\OrderRepository;
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
     * @var OrderRepository
     */
    private $orders;

    /**
     * PlanController constructor.
     * @param PaymentGatewayInterface $payment
     * @param EventRepository $repository
     * @param OrderRepository $orders
     */
    public function __construct(PaymentGatewayInterface $payment, EventRepository $repository, OrderRepository $orders)
    {
        $this->events = $repository;
        $this->payment = $payment;
        $this->orders = $orders;
    }

    public function subscribe(Plan $plan, User $user)
    {
        $url = null;

        switch ($plan->name) {
            case "personal":
            case "premium":
                $url = $this->checkout(
                    $this->newOrder($plan, $user)
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

    protected function checkout(Order $order)
    {
        $url = null;

        try {
            $response = $this->payment->purchase([
                'amount'        => Cashier::formatAmount($order->amount),
                'transactionId' => $order->transaction_id,
                'currency'      => Cashier::usesCurrency(),
                'cancelUrl'     => $this->payment->getCancelUrl($order),
                'returnUrl'     => $this->payment->getReturnUrl($order),
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
     * @return Order
     */
    protected function newOrder(Plan $plan, User $user): Order
    {
        $data = collect([
            'user_id'        => $user->id,
            'transaction_id' => rand(10000000, 99999999),
            'plan_id'        => $plan->id,
            'amount'         => $plan->price,
        ]);

        return $this->orders->store($data);
    }

    /**
     * @return mixed
     */
    protected function getFreePlanId()
    {
        return Plan::where('name', 'free')->first()->id;
    }
}

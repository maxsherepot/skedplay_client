<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Main\Repositories\EventRepository;
use Modules\Main\Services\Cashier\Order;
use Modules\Main\Services\Cashier\PaymentInterface;
use Modules\Main\Services\Cashier\Plan;
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
     * @var PaymentInterface
     */
    private $payment;

    public function __construct(PaymentInterface $payment, EventRepository $repository)
    {
        $this->events = $repository;
        $this->payment = $payment;
    }

    public function subscribe(Plan $plan, User $user)
    {
        Log::info('newSubscription to free plan by default');
        $user->newSubscription(
            'main',
            Plan::where('name', 'free')->first()->id
        )->create();

        switch ($plan->name) {
            case "personal":
            case "premium":
                $order = $this->makeOrder($plan, $user);
                $this->checkout($order);
                break;
            default:
            case "free":
                break;
        }
    }

    protected function checkout(Order $order)
    {
        Log::info('checkout');

        $response = $this->payment->purchase([
            'amount'        => $order->amount,
            'transactionId' => $order->transaction_id,
            'currency'      => 'USD',
            'cancelUrl'     => $this->payment->getCancelUrl($order),
            'returnUrl'     => $this->payment->getReturnUrl($order),
        ]);

        if ($response->isRedirect()) {
            $response->redirect();
        }

        Log::info('Checkout message' . $response->getMessage());
    }

    protected function makeOrder(Plan $plan, User $user)
    {
        Log::info('makeOrder');
        /**
         * Move to repository
         */
        $order = new Order;
        $transaction_id = rand(10000000, 99999999);
        $order->user_id = $user->id;
        $order->transaction_id = $transaction_id;
        $order->plan_id = $plan->id;
        $order->amount = $plan->price;
        $order->save();

        return $order;
    }
}

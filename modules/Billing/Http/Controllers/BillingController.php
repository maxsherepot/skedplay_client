<?php declare(strict_types=1);

namespace Modules\Billing\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Order;

class BillingController extends Controller
{
    /**
     * @var PaymentGatewayInterface
     */
    private $payment;

    public function __construct(PaymentGatewayInterface $payment)
    {
        $this->payment = $payment;
    }

    /**
     * @param Order $order
     * @param $env
     */
    public function webhook(Order $order, $env)
    {
        // Todo: paypal-ipn
    }
}

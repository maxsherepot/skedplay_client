<?php declare(strict_types=1);

namespace Modules\Billing\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Order;
use Modules\Billing\Entities\PayPalIPN;
use Modules\Billing\Repositories\IPNRepository;
use PayPal\IPN\Event\IPNInvalid;
use PayPal\IPN\Event\IPNVerificationFailure;
use PayPal\IPN\Event\IPNVerified;
use PayPal\IPN\Listener\Http\ArrayListener;

class BillingController extends Controller
{
    /**
     * @var PaymentGatewayInterface
     */
    private $payment;
    /**
     * @var IPNRepository
     */
    private $repository;
    /**
     * @var Request
     */
    private $request;

    public function __construct(PaymentGatewayInterface $payment, IPNRepository $repository, Request $request)
    {
        $this->payment = $payment;
        $this->repository = $repository;
        $this->request = $request;
    }

    /**
     * @param Order $order
     * @param $env
     */
    public function webhook(Order $order, $env)
    {
        $listener = new ArrayListener;

        if ($env === 'sandbox') {
            $listener->useSandbox();
        }

        $listener->setData($this->request->all());
        $listener = $listener->run();

        $listener->onInvalid(function (IPNInvalid $event) use ($order) {
            $this->repository->handle($event, PayPalIPN::IPN_INVALID, $order);
        });

        $listener->onVerified(function (IPNVerified $event) use ($order) {
            $this->repository->handle($event, PayPalIPN::IPN_VERIFIED, $order);
        });

        $listener->onVerificationFailure(function (IPNVerificationFailure $event) use ($order) {
            $this->repository->handle($event, PayPalIPN::IPN_FAILURE, $order);
        });

        $listener->listen();
    }
}

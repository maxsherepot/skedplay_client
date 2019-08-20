<?php declare(strict_types=1);

namespace Modules\Billing\Services\Gateway;

use Illuminate\Http\Request;
use Modules\Billing\Contracts\PaymentGatewayInterface;
use Modules\Billing\Entities\Transaction;
use Modules\Billing\Repositories\TransactionRepository;
use Omnipay\Omnipay;
use PayPal\IPN\Listener\Http\ArrayListener;

class PayPal implements PaymentGatewayInterface
{
    /**
     * @var Request
     */
    private $request;
    /**
     * @var TransactionRepository
     */
    private $transactions;

    /**
     * PayPal constructor.
     * @param Request $request
     * @param TransactionRepository $transactions
     */
    public function __construct(Request $request, TransactionRepository $transactions)
    {
        $this->request = $request;
        $this->transactions = $transactions;
    }

    /**
     * @return mixed
     */
    public function gateway()
    {
        $gateway = Omnipay::create('PayPal_Express');

        $gateway->initialize([
            'username'  => config('services.paypal.username'),
            'password'  => config('services.paypal.password'),
            'signature' => config('services.paypal.signature'),
            'testMode'  => config('services.paypal.sandbox'),
        ]);

        return $gateway;
    }

    /**
     * @param array $parameters
     * @return mixed
     */
    public function purchase(array $parameters)
    {
        $response = $this->gateway()
            ->purchase($parameters)
            ->send();

        return $response;
    }

    /**
     * @param array $parameters
     * @return mixed
     */
    public function complete(array $parameters)
    {
        $response = $this->gateway()
            ->completePurchase($parameters)
            ->send();

        return $response;
    }


    /**
     * @param Transaction $transaction
     * @param string $env
     * @return mixed
     */
    public function webhook(Transaction $transaction, string $env)
    {
        $listener = new ArrayListener;

        if ($env === 'sandbox') {
            $listener->useSandbox();
        }

        $listener->setData($this->request->all());
        $listener = $listener->run();

        $listener->onInvalid(function () use ($transaction) {
            $this->transactions->handle(Transaction::CANCELED, $transaction);
        });

        $listener->onVerified(function () use ($transaction) {
            $this->transactions->handle(Transaction::COMPLETED, $transaction);
        });

        $listener->onVerificationFailure(function () use ($transaction) {
            $this->transactions->handle(Transaction::CANCELED, $transaction);
        });

        $listener->listen();
    }

    /**
     * @param $transaction
     * @return string
     */
    public function getCancelUrl($transaction): string
    {
        return url(
            sprintf(self::CANCELLED_URL, $transaction->id)
        );
    }

    /**
     * @param $transaction
     * @return string
     */
    public function getReturnUrl($transaction): string
    {
        return url(
            sprintf(self::COMPLETED_URL, $transaction->id)
        );
    }

    /**
     * For start ngrok you should run "ngrok http --host-header=demo.local 80"
     * For local test replace line 86-88, on: return "https://*.ngrok.io" . vsprintf(self::NOTIFY_URL, [$transaction->id, $env]);
     *
     * @param $transaction
     * @return string
     */
    public function getNotifyUrl($transaction): string
    {
        $env = config('services.paypal.sandbox') ? "sandbox" : "live";

        return url(
            vsprintf(self::NOTIFY_URL, [$transaction->id, $env])
        );
    }

}
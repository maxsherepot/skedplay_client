<?php

namespace Modules\Billing\Services\Gateway;

use Modules\Billing\Contracts\PaymentGatewayInterface;
use Omnipay\Omnipay;

class PayPal implements PaymentGatewayInterface
{
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
     * @param $invoice
     * @return string
     */
    public function getCancelUrl($invoice)
    {
        return url(
            sprintf(self::CANCELLED_URL, $invoice->id)
        );
    }

    /**
     * @param $invoice
     * @return string
     */
    public function getReturnUrl($invoice)
    {
        return url(
            sprintf(self::COMPLETED_URL, $invoice->id)
        );
    }

    /**
     * @param $invoice
     * @return string
     */
    public function getNotifyUrl($invoice)
    {
        $env = config('services.paypal.sandbox') ? "sandbox" : "live";
        return "https://80e3f238.ngrok.io/webhook/payment/{$invoice->id}/$env";
//        return route('webhook.payment.ipn', [$invoice->id, $env]);
    }

}
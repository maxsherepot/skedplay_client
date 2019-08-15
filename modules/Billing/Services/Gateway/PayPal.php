<?php

namespace Modules\Billing\Services\Gateway;

use Modules\Billing\Contracts\PaymentGatewayInterface;
use Omnipay\Omnipay;

class PayPal implements PaymentGatewayInterface
{
    const COMPLETED_URL = '/payment/checkout/%d/completed';
    const CANCELLED_URL = '/payment/checkout/%d/cancelled';

    /**
     * @return mixed
     */
    public function gateway()
    {
        $gateway = Omnipay::create('PayPal_Express');

        $gateway->initialize([
            'username'  => config('services.paypal_express.username'),
            'password'  => config('services.paypal_express.password'),
            'signature' => config('services.paypal_express.signature'),
            'testMode'  => config('services.paypal_express.sandbox'),
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
     * @param $order
     * @return string
     */
    public function getCancelUrl($order)
    {
        return sprintf(self::CANCELLED_URL, $order->id);
    }

    /**
     * @param $order
     * @return string
     */
    public function getReturnUrl($order)
    {
        return sprintf(self::COMPLETED_URL, $order->id);
    }

    /**
     * @param $order
     * @return string
     */
    public function getNotifyUrl($order)
    {
        $env = config('services.paypal.sandbox') ? "sandbox" : "live";

        return route('webhook.payment.ipn', [$order->id, $env]);
    }

}
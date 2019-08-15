<?php

namespace Modules\Main\Services\Cashier;

use Omnipay\Omnipay;

class PayPal implements PaymentInterface
{
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
        return route('payment.checkout.cancelled', $order->id);
    }

    /**
     * @param $order
     * @return string
     */
    public function getReturnUrl($order)
    {
        return route('payment.checkout.completed', $order->id);
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
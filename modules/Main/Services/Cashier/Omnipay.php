<?php

namespace Modules\Main\Services\Cashier;

use Omnipay\Common\CreditCard;
use Omnipay\Omnipay as Gateway;

class Omnipay
{
    public function purchase(array $params)
    {
        $gateway = Gateway::create('PayPal_Express');

        $gateway->initialize([
            'username'  => config('services.paypal_express.username'),
            'password'  => config('services.paypal_express.password'),
            'signature' => config('services.paypal_express.signature'),
            'testMode'  => true,
        ]);

        $card = new CreditCard([
            'number'      => '4242424242424242',
            'expiryMonth' => '6',
            'expiryYear'  => '2016',
            'cvv'         => '123'
        ]);

        $response = $gateway->purchase([
            'amount'    => '10.00',
            'returnUrl' => 'http://demo.local/return',
            'cancelUrl' => 'http://demo.local/cancel',
            'card'      => $card
        ])->send();

//        if ($response->isSuccessful()) {
//            return true;
//        } elseif ($response->isRedirect()) {
//            $response->redirect();
//        } else {
//            return false;
//        }

        return true;
    }
}
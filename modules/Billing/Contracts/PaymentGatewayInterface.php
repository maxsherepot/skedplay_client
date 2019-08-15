<?php

namespace Modules\Billing\Contracts;

interface PaymentGatewayInterface
{
    /**
     * @return mixed
     */
    public function gateway();

    /**
     * @param array $parameters
     * @return mixed
     */
    public function purchase(array $parameters);

    /**
     * @param array $parameters
     * @return mixed
     */
    public function complete(array $parameters);

    /**
     * @param $order
     * @return string
     */
    public function getCancelUrl($order);

    /**
     * @param $order
     * @return string
     */
    public function getReturnUrl($order);

    /**
     * @param $order
     * @return string
     */
    public function getNotifyUrl($order);
}
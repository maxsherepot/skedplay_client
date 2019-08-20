<?php declare(strict_types=1);

namespace Modules\Billing\Contracts;

use Modules\Billing\Entities\Transaction;

interface PaymentGatewayInterface
{
    const COMPLETED_URL = '/payment/checkout/%d/completed';
    const CANCELLED_URL = '/payment/checkout/%d/cancelled';
    const NOTIFY_URL = '/webhook/payment/%d/%s';

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
     * @param Transaction $transaction
     * @param string $env
     * @return mixed
     */
    public function webhook(Transaction $transaction, string $env);

    /**
     * @param $transaction
     * @return string
     */
    public function getCancelUrl($transaction): string;

    /**
     * @param $transaction
     * @return string
     */
    public function getReturnUrl($transaction): string;

    /**
     * @param $transaction
     * @return string
     */
    public function getNotifyUrl($transaction): string;
}
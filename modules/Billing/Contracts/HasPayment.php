<?php declare(strict_types=1);

namespace Modules\Billing\Contracts;

interface HasPayment
{
    const CANCELED = 2;
    const COMPLETED = 1;
    const PENDING = 0;

    const PAYPAL = 'paypal';
    const SMS = 'sms';

    const AVAILABLE_GATEWAY = [
        self::PAYPAL,
        self::SMS,
    ];

    /**
     * Payment completed.
     *
     * @return boolean
     */
    public function paid(): bool;

    /**
     * Payment is still pending.
     *
     * @return boolean
     */
    public function unpaid(): bool;
}
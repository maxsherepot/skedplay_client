<?php declare(strict_types=1);

namespace Modules\Billing\Traits;

use Modules\Billing\Services\Gateway\PayPal;

trait Paymentable
{
    /**
     * Payment completed.
     *
     * @return boolean
     */
    public function paid(): bool
    {
        return in_array($this->status, [self::COMPLETED]);
    }

    /**
     * Payment is still pending.
     *
     * @return boolean
     */
    public function unpaid(): bool
    {
        return in_array($this->status, [self::PENDING]);
    }

    /**
     * @param string $payment_method
     * @return false|int|string|null
     */
    public static function getPayment(string $payment_method)
    {
        $paymentsMap = static::paymentsMap();

        if (!empty($paymentsMap) && in_array($payment_method, $paymentsMap)) {
            return array_search($payment_method, $paymentsMap, true);
        }

        return null;
    }

    /**
     * @return array
     */
    public static function paymentsMap(): array
    {
        return [
            PayPal::class => self::PAYPAL,
        ];
    }
}

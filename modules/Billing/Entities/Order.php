<?php

namespace Modules\Billing\Entities;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    const COMPLETED = 1;
    const PENDING = 0;

    /**
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * @var array
     */
    protected $fillable = ['user_id', 'plan_id', 'transaction_id', 'amount', 'payment_status'];

    /**
     * Payment completed.
     *
     * @return boolean
     */
    public function paid()
    {
        return in_array($this->payment_status, [self::COMPLETED]);
    }

    /**
     * Payment is still pending.
     *
     * @return boolean
     */
    public function unpaid()
    {
        return in_array($this->payment_status, [self::PENDING]);
    }
}

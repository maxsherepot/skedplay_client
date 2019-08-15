<?php

namespace Modules\Main\Services\Cashier;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    const PAYMENT_COMPLETED = 1;
    const PAYMENT_PENDING = 0;

    /**
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * @var array
     */
    protected $fillable = ['transaction_id', 'amount', 'payment_status'];
}

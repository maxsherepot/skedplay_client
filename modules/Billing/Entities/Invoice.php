<?php

namespace Modules\Billing\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Users\Entities\User;

class Invoice extends Model
{
    const COMPLETED = 1;
    const PENDING = 0;

    const PAYPAL_GATEWAY = 'paypal';
    const SMS_GATEWAY = 'sms';

    const AVAILABLE_GATEWAY = [
        self::PAYPAL_GATEWAY,
        self::SMS_GATEWAY,
    ];

    /**
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * @var array
     */
    protected $fillable = [
        'user_id',
        'plan_id',
        'transaction_id',
        'amount',
        'payment_status',
        'payment_method'
    ];

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

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

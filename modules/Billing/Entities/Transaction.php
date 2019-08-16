<?php declare(strict_types=1);

namespace Modules\Billing\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Billing\Contracts\HasPayment;
use Modules\Billing\Traits\Paymentable;

class Transaction extends Model implements HasPayment
{
    use Paymentable;

    /**
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * @var array
     */
    protected $fillable = [
        'invoice_id',
        'payment_txn_id',
        'payment_method',
        'status',
    ];

    /**
     * @return BelongsTo
     */
    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
}

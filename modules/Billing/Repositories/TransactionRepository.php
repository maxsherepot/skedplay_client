<?php declare(strict_types=1);

namespace Modules\Billing\Repositories;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Modules\Billing\Entities\Transaction;

class TransactionRepository
{
    /**
     * @param Collection $collection
     * @return Transaction
     */
    public function store(Collection $collection): Transaction
    {
        return Transaction::create($collection->toArray());
    }

    /**
     * @param int $status
     * @param Transaction $transaction
     */
    public function handle(int $status, Transaction $transaction)
    {
        if ($transaction && $status === Transaction::COMPLETED && $transaction->unpaid()) {
            $transaction->update([
                'status' => $transaction::COMPLETED,
            ]);
        }
    }
}
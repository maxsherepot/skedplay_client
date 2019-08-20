<?php declare(strict_types=1);

namespace Modules\Billing\Repositories;

use Illuminate\Support\Collection;
use Modules\Billing\Entities\Invoice;

class InvoiceRepository
{
    /**
     * @param Collection $collection
     * @return Invoice
     */
    public function store(Collection $collection): Invoice
    {
        return Invoice::create($collection->toArray());
    }
}

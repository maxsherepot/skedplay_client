<?php declare(strict_types=1);

namespace Modules\Billing\Repositories;

use Illuminate\Support\Collection;
use Modules\Billing\Entities\Order;

class OrderRepository
{
    /**
     * @param Collection $collection
     * @return Order
     */
    public function store(Collection $collection): Order
    {
        return Order::create($collection->toArray());
    }
}

<?php declare(strict_types=1);

namespace Modules\Common\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;

class PriceRepository
{
    /**
     * @param Model $model
     * @param Collection $collection
     * @return Club
     */
    public function sync(Model $model, Collection $collection): Model
    {
        $prices = collect(
            $collection->get('prices')
        );

        $prices = $prices->mapWithKeys(function ($value, $key) {
            return [
                $key => ['price' => $value]
            ];
        })->toArray();

        /** @var Club|Employee $model */
        $model->prices()->sync($prices);

        return $model;
    }
}

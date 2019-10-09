<?php declare(strict_types=1);

namespace Modules\Common\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;

class ServiceRepository
{
    /**
     * @param Model $model
     * @param Collection $collection
     * @return Club
     */
    public function sync(Model $model, Collection $collection): Model
    {
        $services = collect(
            $collection->get('services')
        );

        $services = $services->mapWithKeys(function ($value, $key) {
            Log::info($value);
            Log::info($key);
            return [$key => ['price' => $value]];
        });

        /** @var Club|Employee $model */
        $model->services()->sync($services);

        return $model;
    }

}

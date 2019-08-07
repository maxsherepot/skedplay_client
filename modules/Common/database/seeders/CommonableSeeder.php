<?php

namespace Modules\Common\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\PriceType;
use Modules\Common\Entities\Service;

trait CommonableSeeder
{
    public function attachPrices(Model $model)
    {
        $this->attachRelations($model, PriceType::all(), 'prices');
    }

    public function attachServices(Model $model)
    {
        $this->attachRelations($model, Service::all(),'services', true, true);
    }

    protected function attachRelations(Model $model, $collection, $relations, $price_increment = false, $random_items = false)
    {
        if ($random_items) {
            $limit      = random_int(1, $collection->count());
            $collection = $collection->random()->all();
        }

        $price = 100;
        foreach ($collection as $item) {

            if ($price_increment) {
                $price += 100;
            }

            $model->{$relations}()->attach([$item->id => compact('price')]);
        }
    }

}

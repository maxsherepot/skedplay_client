<?php

namespace Modules\Common\Entities\Traits;

use Illuminate\Support\Collection;
use Modules\Common\Entities\PriceType;

trait Priceable
{

    /**
     * @return mixed
     */
    public function prices()
    {
        return $this->morphToMany(PriceType::class, 'priceable')->withPivot('price');
    }

    public function getPricesListAttribute(): Collection
    {
        return $this->prices->mapWithKeys(function($price) {
            return [$price->display_name => $price->pivot->price . '$'];
        });
    }
}

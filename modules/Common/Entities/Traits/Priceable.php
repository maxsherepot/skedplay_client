<?php

namespace Modules\Common\Entities\Traits;

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

}

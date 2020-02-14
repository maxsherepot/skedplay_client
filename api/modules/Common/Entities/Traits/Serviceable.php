<?php

namespace Modules\Common\Entities\Traits;

use Modules\Common\Entities\Service;

trait Serviceable
{
    /**
     * @return mixed
     */
    public function services()
    {
        return $this->morphToMany(Service::class, 'serviceable')->withPivot('price');
    }
}

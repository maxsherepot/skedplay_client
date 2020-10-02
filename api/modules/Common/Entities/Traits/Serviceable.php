<?php

namespace Modules\Common\Entities\Traits;

use Modules\Common\Entities\Service;
use Modules\Common\Entities\ServiceAllLangs;

trait Serviceable
{
    /**
     * @return mixed
     */
    public function services()
    {
        return $this->morphToMany(Service::class, 'serviceable')->withPivot('price');
    }

    public function serviceAllLangs()
    {
        return $this->morphToMany(
            ServiceAllLangs::class,
            'serviceable',
            'serviceables',
            null,
            'service_id',
            null,
            null,
        )->withPivot('price');
    }
}

<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern\Employee;

use Illuminate\Support\Collection;
use Modules\Common\Entities\Canton;
use Modules\Common\Entities\City;
use Modules\Common\Entities\Service;

final class EmployeePatternData
{
    /**
     * @var Collection|Service[]
     */
    private $services;
    /**
     * @var Canton|null
     */
    private $canton;
    /**
     * @var City|null
     */
    private $city;

    public function __construct(Collection $services, ?Canton $canton = null, ?City $city = null)
    {
        $this->services = $services;
        $this->canton = $canton;
        $this->city = $city;
    }

    /**
     * @return Collection|Service[]
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function getCanton(): ?Canton
    {
        return $this->canton;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }
}

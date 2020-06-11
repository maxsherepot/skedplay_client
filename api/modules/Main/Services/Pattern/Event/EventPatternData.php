<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern\Event;

use Illuminate\Support\Collection;
use Modules\Common\Entities\Canton;
use Modules\Common\Entities\City;
use Modules\Events\Entities\EventType;

final class EventPatternData
{
    /**
     * @var Canton|null
     */
    private $canton;
    /**
     * @var City|null
     */
    private $city;
    /**
     * @var EventType[]
     */
    private $types;

    public function __construct(Collection $types, ?Canton $canton = null, ?City $city = null)
    {
        $this->canton = $canton;
        $this->city = $city;
        $this->types = $types;
    }

    public function getCanton(): ?Canton
    {
        return $this->canton;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function getTypes(): Collection
    {
        return $this->types;
    }
}

<?php declare(strict_types=1);

namespace Modules\Common\Services\Location;

final class Coordinates
{
    /**
     * @var float
     */
    private $lat;
    /**
     * @var float
     */
    private $lng;

    public function __construct(float $lat, float $lng)
    {
        $this->lat = $lat;
        $this->lng = $lng;
    }

    /**
     * @return float
     */
    public function getLat(): float
    {
        return $this->lat;
    }

    /**
     * @return float
     */
    public function getLng(): float
    {
        return $this->lng;
    }
}

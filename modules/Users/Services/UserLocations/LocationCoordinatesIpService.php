<?php

namespace Modules\Users\Services\UserLocations;

class LocationCoordinatesIpService
{
    protected $ip;
    protected $data;

    /**
     * @return mixed
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * @return object
     */
    public function getCoordinates(): object
    {
        $this->data = \Location::get($this->getIp());

        return (object)[
            'lat' => $this->data->latitude,
            'lng' => $this->data->longitude,
        ];
    }

    /**
     * @param string $ip
     * @return $this
     */
    public function setIp(string $ip)
    {
        $this->ip = $ip;
        return $this;
    }
}
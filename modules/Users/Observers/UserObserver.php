<?php

namespace Modules\Users\Observers;

use Modules\Users\Entities\User;
use Modules\Users\Services\UserLocations\LocationCoordinatesIpService;

class UserObserver
{
    public function creating(User $user)
    {
        if (is_null($user->lat) && is_null($user->lng) && $ip = request()->ip()) {
            try {
                $coordinates = (new LocationCoordinatesIpService())
                    ->setIp($ip)
                    ->getCoordinates();
                $user->lat = $coordinates->lat ?? User::DEFAULT_LATITUDE;
                $user->lng = $coordinates->lng ?? User::DEFAULT_LONGITUDE;
            } catch (\Exception $e) {
            }
        }
    }
}
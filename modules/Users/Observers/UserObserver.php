<?php

namespace Modules\Users\Observers;

use Modules\Users\Services\UserLocations\LocationCoordinatesIpService;
use Modules\Users\Entities\User;

class UserObserver
{
    public function creating(User $user)
    {
        if (is_null($user->lat) && is_null($user->lng) && $ip = request()->ip()) {
            try {
                $user->coordinates = (new LocationCoordinatesIpService())->setIp($ip)->getCoordinates();
            } catch (\Exception $e) {
            }
        }
    }
}
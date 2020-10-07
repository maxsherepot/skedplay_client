<?php

namespace Modules\Clubs;

use Modules\Events\Entities\Event;
use Modules\Clubs\Entities\Club;
use Modules\Common\Helpers as CommonHelpers;

class Helpers
{
    public static function createFrontLink(Club $club) : string
    {
        $club->load('city.canton');
        $localePath = CommonHelpers::frontLocalePath();

        if (isset($club->city)) {
            return config('app.front_app_url') .
                $localePath.
                '/clubs' .
                '/' . $club->city->canton->slug .
                '/' . $club->city->slug .
                '/' . $club->id .
                '/information';
        }

        return config('app.front_app_url') .
            $localePath .
            '/clubs' .
            '/' . $club->id .
            '/information';
    }

    public static function createFrontEventLink(Club $club, Event $event) : string
    {
        $club->load('city.canton');
        $localePath = CommonHelpers::frontLocalePath();

        if (isset($club->city)) {
            return config('app.front_app_url') .
                $localePath .
                '/clubs' .
                '/' . $club->city->canton->slug .
                '/' . $club->city->slug .
                '/' . $club->id .
                '/information';
        }

        return config('app.front_app_url') .
            $localePath .
            '/clubs' .
            '/' . $club->id .
            '/events/' . $event->id;
    }

}

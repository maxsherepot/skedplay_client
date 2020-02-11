<?php

namespace Skidplay\UserTopInfo;

use Laravel\Nova\Card;

class UserTopInfo extends Card
{
    /**
     * The width of the card (1/3, 1/2, or full).
     *
     * @var string
     */
    public $width = 'full';

    /**
     * Get the component name for the element.
     *
     * @return string
     */
    public function component()
    {
        return 'user-top-info';
    }
}

<?php

namespace Modules\Users\Entities\Traits;

use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;

trait HasFavoriteables
{
    public function favoriteEmployees()
    {
        return $this->morphedByMany(Employee::class, 'favoriteable');
    }

    public function favoriteClubs()
    {
        return $this->morphedByMany(Club::class, 'favoriteable');
    }

    public function favoriteEvents()
    {
        return $this->morphedByMany(Event::class, 'favoriteable');
    }
}

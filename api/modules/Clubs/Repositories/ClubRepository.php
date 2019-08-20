<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Illuminate\Support\Collection;
use Modules\Clubs\Entities\Club;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Traits\Mediable;
use Modules\Users\Entities\User;

class ClubRepository implements HasMediable
{
    use Mediable;

    /**
     * @param User $user
     * @param Collection $collection
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function store(User $user, Collection $collection): \Illuminate\Database\Eloquent\Model
    {
        return $user->clubs()->create($collection->toArray());
    }

    /**
     * @param Club $club
     * @param Collection $collection
     * @return bool
     */
    public function update(Club $club, Collection $collection): bool
    {
        return $club->update($collection->toArray());
    }
}

<?php

namespace Modules\Girls\Repositories;

use Illuminate\Support\Collection;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Girls\Entities\Girl;
use Modules\Girls\Entities\GirlOwnerInterface;
use Modules\Users\Repositories\Traits\Mediable;

class GirlRepository
{
    use Statusable, Mediable;

    /**
     * @param GirlOwnerInterface $owner
     * @param Collection $data
     * @return mixed
     */
    public function store(GirlOwnerInterface $owner, Collection $data)
    {
        $girl = new Girl($data->toArray());
        $girl->owner()->associate($owner);

        $girl->save();

        return $girl;
    }

    /**
     * @param Girl $girl
     * @param Collection $collection
     * @return Girl
     */
    public function update(Girl $girl, Collection $collection): Girl
    {
        $girl->update($collection->toArray());

        return $girl;
    }

}

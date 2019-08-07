<?php

namespace Modules\Girls\Repositories;

use Illuminate\Support\Collection;
use Modules\Girls\Entities\Girl;
use Modules\Girls\Entities\GirlOwnerInterface;

class GirlRepository
{

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
}

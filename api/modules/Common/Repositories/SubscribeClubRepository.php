<?php

namespace Modules\Common\Repositories;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Modules\Common\Entities\SubscribeClub;

class SubscribeClubRepository
{
    /**
     * @param Collection $collection
     * @return Model
     */
    public function store(Collection $collection): Model
    {
        DB::beginTransaction();

        $subscription = SubscribeClub::query()->create($collection->toArray());
        $subscription->save();

        DB::commit();

        return $subscription;
    }
}

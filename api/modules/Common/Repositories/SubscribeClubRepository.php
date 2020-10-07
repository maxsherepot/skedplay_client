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

        $data = $collection->toArray();

        $subscription = SubscribeClub::firstOrCreate(['email' => $data['email']], $data);

        DB::commit();

        return $subscription;
    }

}

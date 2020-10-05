<?php

namespace Modules\Common\Repositories;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\SubscribeEmployee;

class SubscribeEmployeeRepository
{
    /**
     * @param Collection $collection
     * @return Model
     */
    public function store(Collection $collection): Model
    {
        DB::beginTransaction();

        $data = $collection->toArray();

        $subscription = SubscribeEmployee::firstOrCreate(['email' => $data['email']], $data);

        DB::commit();

        return $subscription;
    }

}

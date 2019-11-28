<?php


namespace Modules\Chat\Services;


use Illuminate\Database\Eloquent\Model;
use Modules\Chat\Contracts\RealtimeInterface;

class RealtimeObserver
{
    public function created(RealtimeInterface $model)
    {
        $channel = $model->getCentrifugeChannel();

    }
}
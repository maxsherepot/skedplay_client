<?php

namespace Modules\Chat\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Chat\Contracts\RealtimeInterface;

class Message extends Model implements RealtimeInterface
{
    protected $fillable = [
        'chat_id',
        'text'
    ];

    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chat_id', 'id');
    }

    public function getCentrifugeChannel() : string
    {
        return '$CHAT_' . $this->receiver_id . '_' . $this->creator_id ;
    }
}

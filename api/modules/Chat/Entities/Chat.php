<?php

namespace Modules\Chat\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Users\Entities\User;

class Chat extends Model
{
    const MESSAGES_LIMIT = 30;

    protected $fillable = [
        'creator_id',
        'receiver_id',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id', 'id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id', 'id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'chat_id', 'id')->orderBy('created_at');
    }

    public function lastMessage()
    {
        return $this->hasOne(Message::class, 'id', 'last_message_id');
    }
}

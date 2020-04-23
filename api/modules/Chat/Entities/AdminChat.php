<?php

namespace Modules\Chat\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Users\Entities\User;

class AdminChat extends Model
{
    const MESSAGES_LIMIT = 1000;

    protected $fillable = [
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function messages()
    {
        return $this->hasMany(AdminChatMessage::class, 'chat_id', 'id')->orderBy('created_at');
    }

    public function lastMessage()
    {
        return $this->hasOne(AdminChatMessage::class, 'chat_id', 'id')
            ->orderBy('created_at', 'desc');
    }
}

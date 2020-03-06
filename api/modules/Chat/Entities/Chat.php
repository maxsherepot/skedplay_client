<?php

namespace Modules\Chat\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Employees\Entities\Employee;
use Modules\Users\Entities\User;

class Chat extends Model
{
    use SoftDeletes;

    const MESSAGES_LIMIT = 1000;

    protected $fillable = [
        'employee_id',
        'client_id',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id', 'id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'chat_id', 'id')->orderBy('created_at');
    }

//    public function lastMessage()
//    {
//        return $this->hasOne(Message::class, 'id', 'last_message_id');
//    }

    public function lastMessage()
    {
        return $this->hasOne(Message::class, 'chat_id', 'id')
            ->orderBy('created_at', 'desc');
    }
}

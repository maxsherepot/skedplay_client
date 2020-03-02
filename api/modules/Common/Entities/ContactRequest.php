<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;

class ContactRequest extends Model
{
    protected $fillable = [
        'theme',
        'name',
        'email',
        'message',
    ];
}

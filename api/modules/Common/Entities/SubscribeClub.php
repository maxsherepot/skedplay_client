<?php

namespace Modules\Common\Entities;

use Modules\Clubs\Entities\Club;
use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Contracts\Translation\HasLocalePreference;

class SubscribeClub extends Model implements HasLocalePreference
{
    use Notifiable;

    protected $fillable = [
        'email',
        'club_id',
        'locale',
    ];

    /**
     * @return BelongsTo
     */
    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function preferredLocale()
    {
        return $this->locale ?? 'en';
    }

}

<?php

namespace Modules\Users\Entities;

use App\Models\ViewedEntity;
use App\Models\ViewedEntityDefault;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserCard extends Model implements ViewedEntity
{
    use ViewedEntityDefault;

    protected $fillable = ['user_id', 'card_type', 'user_type', 'code', 'expires_at', 'ref_user_id', 'seen'];

    protected $dates = ['expires_at'];

    protected $appends = [
        'display_card_type',
        'display_user_type',
        'is_expired',
    ];

    const USER_TYPES = [
        1 => User::ACCOUNT_CLIENT,
        2 => User::ACCOUNT_CLUB_OWNER,
        3 => User::ACCOUNT_EMPLOYEE,
    ];

    const USER_TYPE_CLIENT = 1;
    const USER_TYPE_CLUB_OWNER = 2;
    const USER_TYPE_EMPLOYEE = 3;

    const EXPIRE_TIME = 365;

    const CARD_TYPES = [
        1 => 'Standard',
        2 => 'Gold',
        3 => 'Premium',
    ];

    public static function boot()
    {
        parent::boot();

        static::saving(function(self $card) {
            if (!$card->expires_at) {
                $card->expires_at = now()->addDays(static::EXPIRE_TIME);
            }

            $date = $card->expires_at->format('dmy');
            $card->full_code = "{$card->card_type}{$card->user_type}{$date}{$card->code}";
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function refUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ref_user_id');
    }

    public function getDisplayCardTypeAttribute(): string
    {
        return self::CARD_TYPES[$this->card_type] ?? 'unknown';
    }

    public function getDisplayUserTypeAttribute(): string
    {
        return self::USER_TYPES[$this->user_type] ?? 'unknown';
    }

    public function getIsExpiredAttribute(): bool
    {
        return $this->expires_at < now();
    }
}

<?php declare(strict_types=1);

namespace Modules\Users\Entities;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Modules\Main\Entities\Event;
use Modules\Main\Entities\PriceType;
use Modules\Main\Entities\Service;
use Tightenco\Parental\HasParent;

class Girl extends User
{
    use HasParent;

    const GIRL_EUROPEAN = 1;
    const GIRL_ASIAN = 2;

    const GIRL_TYPES = [
        self::GIRL_EUROPEAN,
        self::GIRL_ASIAN,
    ];

    protected $fillable = [
        'gender',
        'birthday',
    ];

    protected $appends = [
        'age'
    ];

    public static function boot()
    {
        parent::boot();

        static::addGlobalScope(function ($query) {
            // Todo: filter by girl role
        });
    }

    /**
     * Get girl age
     * @return int
     */
    public function getAgeAttribute(): int
    {
        return Carbon::parse($this->attributes['birthday'])->age;
    }

    /**
     * @return BelongsToMany
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class)
            ->withPivot(['extra', 'cost']);
    }

    /**
     * @return BelongsToMany
     */
    public function prices(): BelongsToMany
    {
        return $this->belongsToMany(PriceType::class)
            ->withPivot('cost');
    }

    /**
     * @return MorphMany
     */
    public function events(): MorphMany
    {
        return $this->morphMany(Event::class, 'eventable');
    }
}

<?php declare(strict_types=1);

namespace Modules\Users\Entities;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Modules\Main\Entities\Event;
use Modules\Main\Entities\Price;
use Modules\Main\Entities\Service;

class Girl extends User
{
    use \Tightenco\Parental\HasParent;

    const GIRL_EUROPEAN = 1;
    const GIRL_ASIAN = 2;

    const GIRL_TYPES = [
        self::GIRL_EUROPEAN,
        self::GIRL_ASIAN,
    ];

    public static function boot()
    {
        parent::boot();

        static::addGlobalScope(function ($query) {
            // Todo: Filter by girl role
        });
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
        return $this->belongsToMany(Price::class)
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

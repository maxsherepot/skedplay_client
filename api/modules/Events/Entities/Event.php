<?php

namespace Modules\Events\Entities;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\Traits\Favoriteable;
use Modules\Employees\Entities\Employee;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;
use Str;

class Event extends Model implements HasMedia
{
    use SoftDeletes, HasMediaTrait, Favoriteable;

    const MAIN_PHOTO_COLLECTION = 'event-main-photo';

    protected $fillable = [
        'title',
        'description',
        'event_type_id',
        'club_id',
    ];

    /**
     * @return string
     */
    public function getShortTitleAttribute()
    {
        return Str::limit($this->title, 10, '...');
    }

    /**
     * @return MorphTo
     */
    public function owner(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return BelongsTo
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(EventType::class, 'event_type_id');
    }

    /**
     * @return BelongsTo
     */
    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection(self::MAIN_PHOTO_COLLECTION);
    }

    /**
     * @param Media|null $media
     * @throws \Spatie\Image\Exceptions\InvalidManipulation
     */
    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('thumb')
            ->height(310)
            ->performOnCollections(self::MAIN_PHOTO_COLLECTION);
    }

    /**
     * @return HasMany
     */
    public function photos(): HasMany
    {
        return $this->hasMany(Media::class, 'model_id', 'id')
            ->where('collection_name', self::MAIN_PHOTO_COLLECTION);
    }

    public function scopeHasCantons(Builder $query, ?array $cantons = null): void
    {
        if (!$cantons) {
            return;
        }

        $query->whereHasMorph('owner', [Employee::class, Club::class], function(Builder $query) use ($cantons) {
            $query->whereHas('city', function(Builder $query) use ($cantons) {
                $query->whereIn('canton_id', $cantons);
            });
        });
    }

    public function scopeCloseTo(Builder $query, array $params): void
    {
        if (
            !($params['lng'] ?? false)
            || !($params['lat'] ?? false)
            || !($params['distanceKm'] ?? false)
        ) {
            return;
        }

        $query->whereHasMorph('owner', [Employee::class, Club::class], function(Builder $query) use ($params) {
            $query->whereRaw("
               ST_Distance_Sphere(
                        point(lng, lat),
                        point(?, ?)
                   ) / 1000 <= ?
                 ", [
                    $params['lng'],
                    $params['lat'],
                    $params['distanceKm'],
                ]);
        });
    }
}

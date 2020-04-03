<?php

namespace Modules\Events\Entities;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\Traits\Favoriteable;
use Modules\Common\Services\Location\Locationable;
use Modules\Employees\Entities\Employee;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Event extends Model implements HasMedia
{
    use SoftDeletes, HasMediaTrait, Favoriteable, Locationable;

    const MAIN_PHOTO_COLLECTION = 'event-main-photo';

    const MODE_REGULAR = 1;
    const MODE_DATE = 2;

    const MODES = [
        self::MODE_REGULAR => 'regular',
        self::MODE_DATE => 'period_or_day',
    ];

    protected $fillable = [
        'title',
        'description',
        'event_type_id',
        'club_id',
        'address',
        'price',
        'lat',
        'lng',
        'mode',
        'days', //  days from 0(sunday) to 6(saturday)
        'start_date',
        'end_date',
        'start_time',
        'isSent',
    ];

    protected $casts = [
        'days' => 'array'
    ];

    protected $dates = [
        'start_date',
        'end_date',
    ];

    /**
     * @return string
     */
    public function getShortTitleAttribute()
    {
        return Str::limit($this->title, 10);
    }

    public function getEmployeesAttribute()
    {
        return $this->employees;
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

    public function employeesRelation(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class, 'event_employee');
    }

    public function employees(): BelongsToMany
    {
        return $this->employeesRelation();
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

        $query
            ->whereRaw("
                   ST_Distance_Sphere(
                            point(lng, lat),
                            point(?, ?)
                       ) / 1000 <= ?
                     ", [
                $params['lng'],
                $params['lat'],
                $params['distanceKm'],
            ])
            ->orWhereHasMorph('owner', [Employee::class, Club::class], function(Builder $query) use ($params) {
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

    public function scopeInDays(Builder $query, ?array $days = null): void
    {
        if (!$days) {
            return;
        }

        $daysJson = json_encode($days);

        $query->whereRaw("
            JSON_OVERLAPS(days, \"$daysJson\") = 1
        ");
    }

    public function scopeOfDate(Builder $query, ?string $date = null): void
    {
        if (!$date) {
            return;
        }

        try {
            $date = Carbon::parse($date);
        } catch (\Exception $e) {
            return;
        }

        $query->whereDate('start_date', '=', $date)
            ->orWhere(function(Builder $query) use ($date) {
                $query->whereRaw("
                    JSON_OVERLAPS(days, \"[$date->dayOfWeek]\") = 1
                ");
            })
            ->orWhere(function(Builder $query) use ($date) {
                $query->whereNotNull('end_date')
                   ->whereDate('start_date', '<=', $date)
                   ->whereDate('end_date', '>=', $date);
            });
    }
}

<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Modules\Users\Entities\User;
use Spatie\MediaLibrary\Models\Media;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Club extends Model implements HasMedia
{
    use HasMediaTrait, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'website',
        'address',
        'phone',
        'description',
        'user_id',
        'lat',
        'lng',
    ];

    const DEFAULT_LATITUDE = '40.6976701';
    const DEFAULT_LONGITUDE = '-74.259875';
    const DEFAULT_COORDINATES = self::DEFAULT_LATITUDE . ', ' . self::DEFAULT_LONGITUDE;

    /**
     * @param $coordinates
     */
    public function setCoordinatesAttribute($coordinates)
    {
        if (is_array($coordinates)) {
            $this->lat = $coordinates['lat'] ?? self::DEFAULT_LATITUDE;
            $this->lng = $coordinates['lng'] ?? self::DEFAULT_LONGITUDE;
        }
        if (is_string($coordinates)) {
            $coordinates = explode(',', str_replace(' ', '', $coordinates));
            $this->lat = $coordinates[0];
            $this->lng = $coordinates[1];
        }
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('logo');
        $this->addMediaCollection('photos');
        $this->addMediaCollection('videos');
    }

    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('medium')
            ->width(420)
            ->height(275);

        $this->addMediaConversion('large')
            ->width(535)
            ->height(785);
    }

    /**
     * @return BelongsToMany
     */
    public function models(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return MorphMany
     */
    public function events(): MorphMany
    {
        return $this->morphMany(Event::class, 'eventable');
    }
}

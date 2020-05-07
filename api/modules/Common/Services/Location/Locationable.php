<?php declare(strict_types=1);

namespace Modules\Common\Services\Location;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Common\Entities\City;

trait Locationable
{
    /**
     * This method is called upon instantiation of the Eloquent Model.
     * It adds the "lat/lng/address" field to the "$fillable" array of the model.
     *
     * @return void
     */
    public function initializeLocationable()
    {
        $this->fillable[] = 'lat';
        $this->fillable[] = 'lng';
        $this->fillable[] = 'address';
        $this->fillable[] = 'city_id';
    }

    public static function bootLocationable()
    {
        static::saving(function (Model $model) {
            static::setCityAndCoordinates($model);
        });
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function scopeHasCanton(Builder $query, ?string $canton = null): void
    {
        if (!$canton) {
            return;
        }

        $query->whereHas('city', function(Builder $query) use ($canton) {
            $query->where('canton_id', $canton);
        });
    }

    public function scopeHasCantons(Builder $query, ?array $cantons = null): void
    {
        if (!$cantons) {
            return;
        }

        $query->whereHas('city', function(Builder $query) use ($cantons) {
            $query->whereIn('canton_id', $cantons);
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
    }

    private static function setCityAndCoordinates(Model $model): void
    {
        if (!is_null($model->lat) && !is_null($model->lng)) {
            return;
        }

        if (!$model->address) {
            return;
        }

        try {
            [$city, $coordinates] = (new LocationCoordinatesAddressService())
                ->getCityAndCoordinatesByAddress($model->address);

            $model->city_id = $city->id;

            $model->lat = $coordinates->getLat();
            $model->lng = $coordinates->getLng();
        } catch (\Exception $e) {}
    }
}

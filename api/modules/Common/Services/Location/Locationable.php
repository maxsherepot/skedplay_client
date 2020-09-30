<?php declare(strict_types=1);

namespace Modules\Common\Services\Location;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Nuwave\Lighthouse\Exceptions\ValidationException;
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

        if ($this->withCurrentPosition) {
            $this->fillable[] = 'current_lat';
            $this->fillable[] = 'current_lng';
            $this->fillable[] = 'current_address';
            $this->fillable[] = 'current_city_id';
        }
    }

    public static function bootLocationable()
    {
        static::saving(function (Model $model) {
            static::setCityAndCoordinates($model);

            if ($model->withCurrentPosition) {
                static::setCityAndCoordinatesFromCurrentAddress($model);
            }
        });
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function scopeHasCity(Builder $query, ?string $city = null): void
    {
        if (!$city) {
            return;
        }

        $query->where('city_id', $city);

//        if ($this->withCurrentPosition) {
//            $query->orWhere('current_city_id', $city);
//        }
    }

    public function scopeHasCanton(Builder $query, ?string $canton = null): void
    {
        if (!$canton) {
            return;
        }

        $query->whereHas('city', function(Builder $query) use ($canton) {
            $query->where('canton_id', $canton);
        });

//        if ($this->withCurrentPosition) {
//            $query->orWhereHas('currentCity', function(Builder $query) use ($canton) {
//                $query->where('canton_id', $canton);
//            });
//        }
    }

    public function scopeHasCantons(Builder $query, ?array $cantons = null): void
    {
        if (!$cantons) {
            return;
        }

        $query->whereHas('city', function(Builder $query) use ($cantons) {
            $query->whereIn('canton_id', $cantons);
        });

//        if ($this->withCurrentPosition) {
//            $query->orWhereHas('currentCity', function(Builder $query) use ($cantons) {
//                $query->whereIn('canton_id', $cantons);
//            });
//        }
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

//        if ($this->withCurrentPosition) {
//            $query->orWhereRaw("
//               ST_Distance_Sphere(
//                    point(current_lng, current_lat),
//                    point(?, ?)
//               ) / 1000 <= ?
//            ", [
//                $params['current_lng'],
//                $params['current_lat'],
//                $params['distanceKm'],
//            ]);
//        }
    }

    private static function setCityAndCoordinates(Model $model): void
    {
        if (!$model->address) {
            return;
        }

        try {
            [$city, $coordinates] = (new LocationCoordinatesAddressService())
                ->getCityAndCoordinatesByAddress($model->address);

            if (!$city) {
                throw ValidationException::withMessages(['address' => ['wrong_address']]);
            }

            $model->city_id = $city->id;

            $model->lat = $coordinates->getLat();
            $model->lng = $coordinates->getLng();
        }
        catch (\Exception $e) {
            if ($e instanceof ValidationException) {
                throw $e;
            }

            throw ValidationException::withMessages(['address' => [$e->getMessage()]]);
        }
    }

    private static function setCityAndCoordinatesFromCurrentAddress(Model $model): void
    {
        if (!$model->current_address) {
            $model->current_city_id = null;
            $model->current_lat =  null;
            $model->current_lng =  null;
            return;
        }

        try {
            [$city, $coordinates] = (new LocationCoordinatesAddressService())
                ->getCityAndCoordinatesByAddress($model->current_address);

            if (!$city) {
                throw ValidationException::withMessages(['current_address' => ['wrong_address']]);
            }

            $model->current_city_id = $city->id;

            $model->current_lat = $coordinates->getLat();
            $model->current_lng = $coordinates->getLng();
        }
        catch (\Exception $e) {
            if ($e instanceof ValidationException) {
                throw $e;
            }

            throw ValidationException::withMessages(['current_address' => [$e->getMessage()]]);
        }
    }
}

<?php declare(strict_types=1);

namespace Modules\Main\Services\Location;

use Illuminate\Database\Eloquent\Model;

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
        array_merge($this->fillable, [
            'lat',
            'lng',
            'address'
        ]);
    }

    public static function bootLocationable()
    {
        static::created(function (Model $model) {
            if (is_null($model->lat) && is_null($model->lng) && $ip = request()->ip()) {
                try {
                    $coordinates = (new LocationCoordinatesIpService())
                        ->setIp($ip)
                        ->getCoordinates();
                    $model->lat = $coordinates->lat;
                    $model->lng = $coordinates->lng;
                } catch (\Exception $e) {
                }
            }
        });
    }
}
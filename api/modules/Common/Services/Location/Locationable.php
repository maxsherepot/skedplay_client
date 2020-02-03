<?php declare(strict_types=1);

namespace Modules\Common\Services\Location;

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
        $this->fillable[] = 'lat';
        $this->fillable[] = 'lng';
        $this->fillable[] = 'address';
    }

    public static function bootLocationable()
    {
        static::saving(function (Model $model) {
            static::setCoordinates($model);
        });
    }

    private static function setCoordinates(Model $model): void
    {
        if (!is_null($model->lat) && !is_null($model->lng)) {
            return;
        }

        if (!$model->address) {
            return;
        }

        try {
            $coordinates = (new LocationCoordinatesAddressService())
                ->getCoordinatesByAddress($model->address);

            $model->lat = $coordinates->getLat();
            $model->lng = $coordinates->getLng();
        } catch (\Exception $e) {}
    }
}

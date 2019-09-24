<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Clubs\Entities\Club;
use Modules\Employees\Entities\Employee;
use Modules\Events\Entities\Event;
use Nwidart\Modules\Routing\Controller;

class FavoriteController extends Controller
{
    public function favorite($id, $type)
    {
        $model = $this->getEntity($id, $type);

        if ($model) {
            $model->favorite();
        }

    }

    public function unfavorite($id, $type)
    {
        $model = $this->getEntity($id, $type);

        if ($model) {
            $model->unfavorite();
        }
    }

    private function getEntity($model_id, $model_type)
    {
        // Bad code, need refactor.

        $model = null;

        switch ($model_type) {
            case "employee":
                $model = (new Employee())->find($model_id);
                break;
            case "club":
                $model = (new Club())->find($model_id);
                break;
            case "event":
                $model = (new Event())->find($model_id);
                break;
            default:
                break;
        }

        return $model;
    }
}

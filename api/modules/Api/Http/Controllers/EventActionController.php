<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Modules\Api\Extensions\GraphQLFormRequest;
use Modules\Common\Entities\EventCount;
use Nwidart\Modules\Routing\Controller;

class EventActionController extends Controller
{
    public function doEvent(GraphQLFormRequest $request)
    {
        $modelId = $request->get('model_id');
        $modelType = $request->get('model_type');
        $event = $request->get('event');

        if (!$modelId || !$modelType || !$event) {
            return response()->json(false);
        }

        $modelId = intval($modelId);

        if (!in_array($modelType, EventCount::ENTITIES, true)) {
            return response()->json(false);
        }

        $cacheKey = "events:$modelType:$modelId:$event:count_exists";

        $eventCountExists = Cache::get($cacheKey) ?? EventCount::query()
                ->where('model_id', $modelId)
                ->where('model_type', $modelType)
                ->where('event', $event)
                ->count() > 0;

        if (!$eventCountExists) {
            $eventCount = new EventCount();
            $eventCount->model_id = $modelId;
            $eventCount->model_type = $modelType;
            $eventCount->event = $event;
            $eventCount->count = 1;
            $eventCount->save();

            Cache::forever($cacheKey, true);

            return response()->json(true);
        }

        EventCount::query()
            ->where('model_id', $modelId)
            ->where('model_type', $modelType)
            ->where('event', $event)
            ->increment('count');

        return response()->json(true);
    }
}

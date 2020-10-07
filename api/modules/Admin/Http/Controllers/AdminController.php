<?php

namespace Modules\Admin\Http\Controllers;

use App\Models\ViewedEntity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class AdminController extends Controller
{
    public function checkResourceSeen(Request $request)
    {
        $modelClass = $request->get('model');
        $id = $request->get('id');

        if (!$modelClass || !$id || !class_exists($modelClass)) {
            return response()->json(['result' => false]);
        }

        $model = $modelClass::find($id);

        if (
            !$model
            || !($model instanceof ViewedEntity)
        ) {
            return response()->json(['result' => false]);
        }

        return response()->json(['result' => true, 'seen' => $model->isViewed()]);
    }
}

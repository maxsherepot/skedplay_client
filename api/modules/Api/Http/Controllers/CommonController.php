<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Requests\Common\ContactRequestCreateRequest;
use Modules\Common\Entities\ContactRequest;
use Nwidart\Modules\Routing\Controller;

class CommonController extends Controller
{
    public function contactRequestCreate(ContactRequestCreateRequest $request)
    {
        return ContactRequest::create($request->validated());
    }
}

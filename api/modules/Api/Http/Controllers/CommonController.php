<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\Common\ContactRequestCreateRequest;
use Modules\Api\Http\Requests\Common\SubscribeClubCreateRequest;
use Modules\Common\Entities\ContactRequest;
use Modules\Common\Repositories\SubscribeClubRepository;
use Nwidart\Modules\Routing\Controller;

class CommonController extends Controller
{
    use Statusable;
    /**
     * @var SubscribeClubRepository
     */
    protected $subscribeClub;

    public function __construct(SubscribeClubRepository $subscribeClub)
    {
        $this->subscribeClub = $subscribeClub;
    }

    /**
     * @param SubscribeClubCreateRequest $request
     * @return array
     */
    public function createSubscribeClub(SubscribeClubCreateRequest $request)
    {
        $this->subscribeClub->store(collect($request));

        return $this->success();
    }

    public function contactRequestCreate(ContactRequestCreateRequest $request)
    {
        return ContactRequest::create($request->validated());
    }
}

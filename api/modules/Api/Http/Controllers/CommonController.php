<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Nwidart\Modules\Routing\Controller;
use Modules\Common\Entities\ContactRequest;
use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Common\Repositories\SubscribeClubRepository;
use Modules\Api\Http\Requests\Common\SubscribeClubCreateRequest;
use Modules\Api\Http\Requests\Common\ContactRequestCreateRequest;
use Modules\Api\Http\Requests\Common\SubscribeEmployeeCreateRequest;
use Modules\Common\Repositories\SubscribeEmployeeRepository;

class CommonController extends Controller
{
    use Statusable;
    /**
     * @var SubscribeClubRepository
     */
    protected $subscribeClub;
    protected $subscribeEmployee;

    public function __construct(SubscribeClubRepository $subscribeClub, SubscribeEmployeeRepository $subscribeEmployee)
    {
        $this->subscribeClub = $subscribeClub;
        $this->subscribeEmployee = $subscribeEmployee;
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

    public function createSubscribeEmployee(SubscribeEmployeeCreateRequest $request)
    {
        $this->subscribeEmployee->store(collect($request));

        return $this->success();
    }

    public function contactRequestCreate(ContactRequestCreateRequest $request)
    {
        $data = $request->validated();

        if (auth('api')->check()) {
            $data['name'] = auth('api')->user()->name;
            $data['email'] = auth('api')->user()->email;
        }

        return ContactRequest::create($data);
    }
}

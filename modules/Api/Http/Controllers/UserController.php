<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers;

use Modules\Api\Http\Controllers\Traits\Statusable;
use Modules\Api\Http\Requests\User\UserUpdateRequest;
use Modules\Users\Entities\User;
use Modules\Users\Repositories\UserRepository;
use Nwidart\Modules\Routing\Controller;

class UserController extends Controller
{
    use Statusable;

    /**
     * @var UserRepository
     */
    protected $users;

    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * @param User $user
     * @param UserUpdateRequest $request
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $this->users->update($user, collect($request->all()));

        return $this->success();
    }
}

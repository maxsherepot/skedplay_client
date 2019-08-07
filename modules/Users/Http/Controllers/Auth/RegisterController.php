<?php

namespace Modules\Users\Http\Controllers\Auth;

use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Routing\Controller;
use Modules\Girls\Repositories\GirlRepository;
use Modules\Users\Entities\User;
use Modules\Users\Http\Requests\Auth\RegistrationRequest;
use Modules\Users\Repositories\UserRepository;

class RegisterController extends Controller
{

    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * AuthController constructor.
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->users = $userRepository;
    }

    /**
     * @param RegistrationRequest $request
     * @return array
     */
    public function register(RegistrationRequest $request): array
    {
        $data = $this->prepareUserData($request->all());

        $user = $this->users->store($data);
        $user->attachRole($request->get('account_type'));

        $data->put('user_id', $user->id);

        switch ($request->get('account_type')) {
            case User::ACCOUNT_GIRL:
                (new GirlRepository())->store($user, $data);
                break;
        }

        event(new Registered($user));

        return [
            'access_token' => $this->users->createToken($user),
            'user'         => $user,
        ];
    }

    protected function prepareUserData(array $data)
    {
        $data = collect($data);
        $data->put('name', $data->only(['first_name', 'last_name'])->implode(' '));

        if($birthday = $data->get('birthday')) {
            $data->put('age', Carbon::parse($birthday)->age);
        }


        return $data;
    }


}

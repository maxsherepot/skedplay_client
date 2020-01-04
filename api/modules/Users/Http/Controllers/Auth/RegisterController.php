<?php

namespace Modules\Users\Http\Controllers\Auth;

use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Routing\Controller;
use Modules\Employees\Repositories\EmployeeRepository;
use Modules\Billing\Entities\Plan;
use Modules\Users\Entities\User;
use Modules\Users\Http\Requests\Auth\RegistrationRequest;
use Modules\Users\Repositories\UserRepository;
use Modules\Users\Services\Verification\Verification;

class RegisterController extends Controller
{
    /**
     * @var UserRepository
     */
    protected $users;
    /**
     * @var Verification
     */
    private $verification;

    /**
     * AuthController constructor.
     * @param UserRepository $userRepository
     * @param Verification $verification
     */
    public function __construct(UserRepository $userRepository, Verification $verification)
    {
        $this->users = $userRepository;
        $this->verification = $verification;
    }

    /**
     * @param RegistrationRequest $request
     * @return array
     */
    public function register(RegistrationRequest $request): array
    {
        $this->verification->checkStatus($request->get('phone'));

        $data = $this->prepareUserData($request->all());

        $user = $this->users->store($data);
        $user->attachRole($request->get('account_type'));

        $user->newSubscription(
            'main',
            $request->get('plan_id', Plan::where('name', 'start')->first()->id)
        )->create();

        $data->put('user_id', $user->id);

        switch ($request->get('account_type')) {
            case User::ACCOUNT_EMPLOYEE:
                (new EmployeeRepository())->store($user, $data);
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

        if ($birthday = $data->get('birthday')) {
            $birthday = Carbon::parse($birthday);
            $data->put('birthday', $birthday);
            $data->put('age', $birthday->age);
        }

        return $data;
    }
}

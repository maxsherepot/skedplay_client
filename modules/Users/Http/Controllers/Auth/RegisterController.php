<?php

namespace Modules\Users\Http\Controllers\Auth;

use Modules\Users\Repositories\UserRegisterRepository;
use Modules\Users\Http\Requests\UserRegisterRequest;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{
	/**
	 * @var UserRegisterRepository
	 */
	protected $userRegisterRepository;

	/**
	 * RegisterController constructor.
	 * @param UserRegisterRepository $userRegisterRepository
	 */
	public function __construct(UserRegisterRepository $userRegisterRepository)
	{
		$this->userRegisterRepository = $userRegisterRepository;
	}

	/**
	 * @param UserRegisterRequest $request
	 * @return void
	 */
	public function register(UserRegisterRequest $request)
	{
		$this->userRegisterRepository->register($request);
//		$this->confirmation->setUser($user)->set($user->email)->send();
//		return $this->response($request, $user);
	}
}
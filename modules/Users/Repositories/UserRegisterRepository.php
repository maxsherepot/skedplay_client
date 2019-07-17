<?php

namespace Modules\Users\Repositories;

use Illuminate\Support\Facades\Hash;
use Modules\Users\Entities\User;

class UserRegisterRepository
{
	/**
	 * @param array $args
	 * @return array
	 */
	public function register(array $args)
	{
		$request['password'] = Hash::make($args['password']);

		/** @var User $user */
		$user = User::create($args);

		$token = $user->createToken('Laravel Password Grant Client')->accessToken;

		$response = [
			'access_token' => $token,
			'user' => $user
		];

		return $response;
	}
}
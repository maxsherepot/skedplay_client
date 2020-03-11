<?php declare(strict_types=1);

namespace Modules\Users\Http\Controllers\Auth;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Users\Entities\User;
use Modules\Users\Http\Requests\Auth\ForgotPasswordRequest;
use Modules\Users\Http\Requests\Auth\LoginRequest;
use Modules\Users\Http\Requests\Auth\ResetPasswordRequest;
use Modules\Users\Repositories\UserRepository;
use Modules\Users\Services\Verification\Verification;
use Nuwave\Lighthouse\Exceptions\AuthenticationException;

class AuthController extends BaseAuthResolver
{
    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * @var Verification
     */
    protected $verification;

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
     * @param LoginRequest $request
     * @return array
     * @throws AuthenticationException
     */
    public function login(LoginRequest $request)
    {
        $credentials = $this->buildCredentials($request->all());
        $response = $this->makeRequest($credentials);

        $model = app(config('auth.providers.users.model'));
        $user = $model->where('phone', $request->get('username'))->firstOrFail();

        if ($user->status === User::STATUS_REFUSED) {
            throw new AuthenticationException('user blocked by reason: '. $user->rejected_reason);
        }

        $response['user'] = $user;

        return $response;
    }

    /**
     * @return array
     * @throws AuthenticationException
     */
    public function logout(): array
    {
        if (!Auth::guard('api')->check()) {
            throw new AuthenticationException("Not Authenticated");
        }

        // revoke user's token
        Auth::guard('api')->user()->token()->revoke();

        return [
            'status'  => self::TOKEN_REVOKED,
            'message' => 'Your session has been terminated'
        ];
    }

    /**
     * @param ForgotPasswordRequest $request
     * @return array
     */
    public function forgotPassword(ForgotPasswordRequest $request): array
    {
        try {
            $user = $this->users->getByPhone($phone = $request->get('phone'));

            $code = $this->verification
                ->setUser($user)
                ->getCode($phone);

            $this->verification->sendCode(
                'Your verification code: ' . $code
            );

        } catch (\Exception $e) {
            Log::info($e->getMessage());
        }

        return $this->verification->response();
    }

    /**
     * @param ResetPasswordRequest $request
     * @return array
     */
    public function resetPassword(ResetPasswordRequest $request): array
    {
        $this->verification->checkCode(
            $request->get('code'),
            $request->get('phone'),
            function () use ($request) {
                $user = $this->users->getByPhone($request->get('phone'));
                $this->users->resetPassword($request->get('password'), $user);
            });

        return $this->verification->response();
    }

    /**
     * @param Request $request
     * @return mixed
     * @throws AuthenticationException
     */
    public function refreshToken(Request $request)
    {
        $credentials = $this->buildCredentials($request->all(), 'refresh_token');
        return $this->makeRequest($credentials);
    }
}

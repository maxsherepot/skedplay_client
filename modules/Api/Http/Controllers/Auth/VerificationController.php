<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers\Auth;

use Modules\Api\Http\Requests\Auth\CheckVerificationRequest;
use Modules\Api\Http\Requests\Auth\SendVerificationRequest;
use Modules\Users\Entities\User;
use Modules\Users\Services\Verification\Verification;

class VerificationController
{
    /**
     * @var Verification
     */
    protected $verification;

    /**
     * AuthController constructor.
     * @param Verification $verification
     */
    public function __construct(Verification $verification)
    {
        $this->verification = $verification;
    }

    /**
     * @param SendVerificationRequest $request
     * @return array
     */
    public function send(SendVerificationRequest $request): array
    {
        $code = $this->verification
            ->setUser(new User([
                'phone' => $phoneNumber = $request->get('phone')
            ]))
            ->getCode($phoneNumber);

        $this->verification->sendCode(
            'Your register verification code: ' . $code
        );

        return $this->verification->response();
    }

    /**
     * @param CheckVerificationRequest $request
     * @return array
     */
    public function check(CheckVerificationRequest $request): array
    {
        $this->verification->checkCode(
            $request->get('code'),
            $request->get('phone'),
            );

        return $this->verification->response();
    }

}

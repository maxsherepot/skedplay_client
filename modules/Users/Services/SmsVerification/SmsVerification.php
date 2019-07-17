<?php

namespace Modules\Users\Services\SmsVerification;

use Modules\Users\Services\SmsVerification\Exceptions\SmsVerificationException;
use Modules\Users\Services\SmsVerification\Exceptions\ValidationException;
use Propaganistas\LaravelPhone\PhoneNumber;
use Illuminate\Support\Facades\Log;

/**
 * Class SmsVerification
 */
class SmsVerification
{
    /**
     * @var NexmoSmsClient
     */
    private $smsClient;

    public function __construct(SmsClientInterface $smsClient)
    {
        $this->smsClient = $smsClient;
    }

    /**
     * Send code
     * @param $phoneNumber
     * @return array
     */
    public function sendCode($phoneNumber)
    {
        $exceptionClass = null;
        $expiresAt = null;
        $response = [];

        try {
            $phoneNumber = static::normalizePhoneNumber($phoneNumber);
            static::validatePhoneNumber($phoneNumber);

            $now = time();
            $code = CodeProcessor::getInstance()->generateCode($phoneNumber);
            $text = 'SMS verification code: ' . $code;

            $success = $this->smsClient->send($phoneNumber, $text);

            $description = $success ? 'OK' : 'Error';

            if ($success) {
                $response['expires_at'] = $now + CodeProcessor::getInstance()->getLifetime();
            }

        } catch (\Exception $e) {
            $description = $e->getMessage();

            if (!($e instanceof ValidationException)) {
                Log::error('SMS Verification code sending was failed: ' . $description);
            }
            $success = false;
            $response['error'] = ($e instanceof SmsVerificationException) ? $e->getErrorCode() : 999;
        }

        $response['success'] = $success;
        $response['description'] = $description;

        return $response;
    }

    /**
     * Check code
     * @param $code
     * @param $phoneNumber
     * @return array
     */
    public function checkCode($code, $phoneNumber)
    {
        $exceptionClass = null;
        $response = [];

        try {
            if (!is_numeric($code)) {
                throw new ValidationException('Incorrect code was provided');
            }
            $phoneNumber = static::normalizePhoneNumber($phoneNumber);
            static::validatePhoneNumber($phoneNumber);
            $success = CodeProcessor::getInstance()->validateCode($code, $phoneNumber);
            $description = $success ? 'OK' : 'Wrong code';
        } catch (\Exception $e) {
            $description = $e->getMessage();
            if (!($e instanceof ValidationException)) {
                Log::error('SMS Verification check was failed: ' . $description);
            }
            $success = false;
            $response['error'] = ($e instanceof SmsVerificationException) ? $e->getErrorCode() : 999;
        }
        $response['success'] = $success;
        $response['description'] = $description;
        return $response;
    }

    /**
     * Normalize phone number
     * @param string $phoneNumber
     * @return string
     */
    protected static function normalizePhoneNumber($phoneNumber): string
    {
        return (string)PhoneNumber::make($phoneNumber);
    }

    /**
     * Validate phone number
     * @param string $phoneNumber
     * @throws ValidationException
     */
    protected static function validatePhoneNumber($phoneNumber)
    {
        // Todo: Add patterns.
        $patterns = [
            "\+?1[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}", // US
            "\+?[2-9]\d{9,}", // International
        ];
        if (!@preg_match("/^(" . implode('|', $patterns) . ")\$/", $phoneNumber)) {
            throw new ValidationException('Incorrect phone number was provided');
        }
    }
}
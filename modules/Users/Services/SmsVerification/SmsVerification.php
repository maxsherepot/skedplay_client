<?php declare(strict_types=1);

namespace Modules\Users\Services\SmsVerification;

use Modules\Users\Services\SmsVerification\Exceptions\SmsVerificationException;
use Modules\Users\Services\SmsVerification\Exceptions\ValidationException;
use Modules\Users\Services\SmsVerification\Code\CodeProcessorInterface;
use Modules\Users\Services\SmsVerification\Clients\SmsClientInterface;
use Propaganistas\LaravelPhone\PhoneNumber;
use Illuminate\Support\Facades\Log;

/**
 * Class SmsVerification
 */
class SmsVerification
{
    /**
     * @var SmsClientInterface
     */
    private $smsClient;
    /**
     * @var CodeProcessorInterface
     */
    private $codeProcessor;

    /**
     * SmsVerification constructor.
     * @param SmsClientInterface $smsClient
     * @param CodeProcessorInterface $codeProcessor
     */
    public function __construct(SmsClientInterface $smsClient, CodeProcessorInterface $codeProcessor)
    {
        $this->smsClient = $smsClient;
        $this->codeProcessor = $codeProcessor;
    }

    /**
     * Send code
     * @param string $phoneNumber
     * @return array
     */
    public function sendCode(string $phoneNumber): array
    {
        $exceptionClass = null;
        $expiresAt = null;
        $response = [];

        try {
            $phoneNumber = static::normalizePhoneNumber($phoneNumber);
            static::validatePhoneNumber($phoneNumber);

            $now = time();
            $code = $this->codeProcessor->generateCode(
                static::trimPhoneNumber($phoneNumber)
            );
            $text = 'SMS verification code: ' . $code;

            $success = $this->smsClient->send($phoneNumber, $text);

            $description = $success ? 'OK' : 'Error';

            if ($success) {
                $response['expires_at'] = $now + $this->codeProcessor->getLifetime();
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
    public function checkCode(string $code, string $phoneNumber): array
    {
        $exceptionClass = null;
        $response = [];

        try {
            if (!is_numeric($code)) {
                throw new ValidationException('Incorrect code was provided');
            }

            $phoneNumber = static::normalizePhoneNumber($phoneNumber);
            static::validatePhoneNumber($phoneNumber);

            $success = $this->codeProcessor->validateCode($code,
                static::trimPhoneNumber($phoneNumber)
            );

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
    protected static function normalizePhoneNumber(string $phoneNumber): string
    {
        return (string)PhoneNumber::make($phoneNumber);
    }

    /**
     * @param $phoneNumber
     * @return string
     */
    private static function trimPhoneNumber(string $phoneNumber): string
    {
        return trim(ltrim($phoneNumber, '+'));
    }

    /**
     * Validate phone number
     * @param string $phoneNumber
     * @throws ValidationException
     */
    protected static function validatePhoneNumber(string $phoneNumber)
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
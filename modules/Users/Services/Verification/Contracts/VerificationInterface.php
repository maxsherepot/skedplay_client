<?php declare(strict_types=1);

namespace Modules\Users\Services\Verification\Contracts;

interface VerificationInterface
{
    public const VERIFICATION_SEND_SUCCESS = 'verification.send.success';
    public const VERIFICATION_SEND_FAILED = 'verification.send.failed';

    public const GENERATE_CODE_SUCCESS = 'generate.code.success';
    public const GENERATE_CODE_FAILED = 'generate.code.failed';

    public const VERIFICATION_CHECK_SUCCESS = 'verification.check.success';
    public const VERIFICATION_CHECK_FAILED = 'verification.check.failed';

    public const VERIFICATION_STATUS_SUCCESS = 'verification.status.success';
    public const VERIFICATION_STATUS_FAILED = 'verification.status.failed';

    /**
     * Get verification code
     * @param string $phoneNumber
     * @return string
     */
    public function getCode(string $phoneNumber): string;

    /**
     * Check code
     * @param string $code
     * @param string $phoneNumber
     * @param callable $callback
     */
    public function checkCode(string $code, string $phoneNumber, callable $callback = null): void;

    /**
     * Response result
     * @return array
     */
    public function response(): array;
}
<?php declare(strict_types=1);

namespace Modules\Users\Services\Verification\Contracts;

interface VerificationInterface
{
    public const VERIFICATION_SEND_SUCCESS = 'VERIFICATION_SEND_SUCCESS';
    public const VERIFICATION_SEND_FAILED = 'VERIFICATION_SEND_FAILED';

    public const GENERATE_CODE_SUCCESS = 'GENERATE_CODE_SUCCESS';
    public const GENERATE_CODE_FAILED = 'GENERATE_CODE_FAILED';

    public const VERIFICATION_CHECK_SUCCESS = 'VERIFICATION_CHECK_SUCCESS';
    public const VERIFICATION_CHECK_FAILED = 'VERIFICATION_CHECK_FAILED';

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
<?php declare(strict_types=1);

namespace Modules\Users\Services\SmsVerification\Code;

use Modules\Users\Services\SmsVerification\Exceptions\GenerateCodeException;
use Modules\Users\Services\SmsVerification\Exceptions\ValidateCodeException;

interface CodeProcessorInterface
{
    /**
     * Generate code, save it in Cache, return it
     * @param string $phoneNumber
     * @return int
     * @throws GenerateCodeException
     */
    public function generateCode(string $phoneNumber): int;

    /**
     * Check code in Cache
     * @param string $code
     * @param string $phoneNumber
     * @return bool
     * @throws ValidateCodeException
     */
    public function validateCode(string $code, string $phoneNumber): bool;

    /**
     * @return int
     */
    public function getLifetime(): int;

}
<?php declare(strict_types=1);

namespace Modules\Users\Services\CodeProcessor\Contracts;

use Modules\Users\Services\CodeProcessor\Exceptions\GenerateCodeException;
use Modules\Users\Services\CodeProcessor\Exceptions\ValidateCodeException;

interface CodeProcessorInterface
{
    public const REGISTER_VERIFIED = 'REGISTER_VERIFIED';

    /**
     * Generate code, save it in Cache, return it
     * @param string $phoneNumber
     * @return string
     * @throws GenerateCodeException
     */
    public function generateCode(string $phoneNumber): string;

    /**
     * Check code in Cache
     * @param string $code
     * @param string $phoneNumber
     * @return bool
     * @throws ValidateCodeException
     */
    public function validateCode(string $code, string $phoneNumber): bool;

    /**
     * Delete code in Cache
     * @param string $code
     */
    public function deleteCode(string $code): void;

    /**
     * @return int
     */
    public function getLifetime(): int;

}
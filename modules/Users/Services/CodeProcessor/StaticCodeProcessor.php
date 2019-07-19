<?php declare(strict_types=1);

namespace Modules\Users\Services\CodeProcessor;

use Modules\Users\Services\CodeProcessor\Contracts\CodeProcessorInterface;
use Modules\Users\Services\CodeProcessor\Exceptions\ValidateCodeException;
use Illuminate\Support\Facades\Cache;

/**
 * Class StaticCodeProcessor
 */
class StaticCodeProcessor implements CodeProcessorInterface
{
    /**
     * Prefix for cache keys
     * @var string
     */
    private $cachePrefix = 'SVC:';

    /**
     * Lifetime of codes in minutes
     * @var int
     */
    private $minutesLifetime = 10;

    /**
     * Generate code, save it in Cache, return it
     * @param string $phoneNumber
     * @return string
     */
    public function generateCode(string $phoneNumber): string
    {
        $code = '0000';

        Cache::put(
            $this->cachePrefix . $code,
            $phoneNumber,
            now()->addSeconds(
                $this->getLifetime()
            )
        );

        return $code;
    }

    /**
     * Check code in Cache
     * @param string $code
     * @param string $phoneNumber
     * @return bool
     * @throws ValidateCodeException
     */
    public function validateCode(string $code, string $phoneNumber): bool
    {
        try {
            $codeValue = Cache::get($this->cachePrefix . $code);

            if ($codeValue && ($codeValue == $phoneNumber)) {
                return true;
            }
        } catch (\Exception $e) {
            throw new ValidateCodeException('Code validation failed', 0, $e);
        }
        return false;
    }

    /**
     * Delete code in Cache
     * @param string $code
     */
    public function deleteCode(string $code): void
    {
        Cache::forget($this->cachePrefix . $code);
    }

    /**
     * @return int Seconds
     */
    public function getLifetime(): int
    {
        return $this->minutesLifetime * 60;
    }
}
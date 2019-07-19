<?php declare(strict_types=1);

namespace Modules\Users\Services\CodeProcessor;

use Modules\Users\Services\CodeProcessor\Exceptions\GenerateCodeException;
use Modules\Users\Services\CodeProcessor\Exceptions\ValidateCodeException;
use Modules\Users\Services\CodeProcessor\Contracts\CodeProcessorInterface;
use Illuminate\Support\Facades\Cache;

/**
 * Class CodeProcessor
 */
class CodeProcessor implements CodeProcessorInterface
{
    /**
     * Prefix for cache keys
     * @var string
     */
    private $cachePrefix = 'SVC:';
    /**
     * Code length
     * @var int
     */
    private $codeLength = 4;
    /**
     * Lifetime of codes in minutes
     * @var int
     */
    private $minutesLifetime = 10;

    /**
     * Generate code, save it in Cache, return it
     * @param string $phoneNumber
     * @return string
     * @throws GenerateCodeException
     */
    public function generateCode(string $phoneNumber): string
    {
        try {
            $randomFunction = 'random_int';

            if (!function_exists($randomFunction)) {
                $randomFunction = 'mt_rand';
            }

            $code = $randomFunction(pow(10, $this->codeLength - 1), pow(10, $this->codeLength) - 1);

            Cache::put(
                $this->cachePrefix . $code,
                $phoneNumber,
                now()->addSeconds(
                    $this->getLifetime()
                )
            );

        } catch (\Exception $e) {
            throw new GenerateCodeException('Code generation failed', 0, $e);
        }

        return (string) $code;
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
                Cache::forget($this->cachePrefix . $code);
                return true;
            }
        } catch (\Exception $e) {
            throw new ValidateCodeException('Code validation failed', 0, $e);
        }
        return false;
    }

    /**
     * @return int Seconds
     */
    public function getLifetime(): int
    {
        return $this->minutesLifetime * 60;
    }
}
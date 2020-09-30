<?php declare(strict_types=1);

namespace Modules\Users\Services\CodeProcessor;

use Modules\Users\Services\CodeProcessor\Contracts\CodeProcessorInterface;
use Modules\Users\Services\CodeProcessor\Exceptions\GenerateCodeException;
use Modules\Users\Services\CodeProcessor\Traits\Support;

/**
 * Class CodeProcessor
 */
class CodeProcessor implements CodeProcessorInterface
{
    use Support;

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
            $this->putInCache($code, $phoneNumber);

        } catch (\Exception $e) {
            throw new GenerateCodeException('Code generation failed', 0, $e);
        }

        return (string)$code;
    }
}

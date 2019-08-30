<?php declare(strict_types=1);

namespace Modules\Users\Services\CodeProcessor;

use Modules\Users\Services\CodeProcessor\Contracts\CodeProcessorInterface;
use Modules\Users\Services\CodeProcessor\Traits\Support;

/**
 * Class StaticCodeProcessor
 */
class StaticCodeProcessor implements CodeProcessorInterface
{
    use Support;

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
        $testCodes = ['0000', '1111'];

        foreach ($testCodes as $code) {
            $this->putInCache($code, $phoneNumber);
        }

        return $testCodes[0];
    }
}
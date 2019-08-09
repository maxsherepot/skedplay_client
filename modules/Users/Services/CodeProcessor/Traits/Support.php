<?php declare(strict_types=1);

namespace Modules\Users\Services\CodeProcessor\Traits;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Modules\Users\Services\CodeProcessor\Exceptions\ValidateCodeException;

trait Support
{
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
                $this->putInCache($phoneNumber, self::REGISTER_VERIFIED);
                return true;
            }
        } catch (\Exception $e) {
            throw new ValidateCodeException('Code validation failed', 0, $e);
        }
        return false;
    }

    /**
     * Check status in Cache
     * @param string $phoneNumber
     * @return bool
     * @throws ValidateCodeException
     */
    public function validateStatus(string $phoneNumber): bool
    {
        $status = Cache::get($this->cachePrefix . $phoneNumber);

        Log::info((string)($status === self::REGISTER_VERIFIED));
        if ($status === self::REGISTER_VERIFIED) {
            return true;
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

    public function putInCache($key, $value)
    {
        Cache::put(
            $this->cachePrefix . $key,
            $value,
            now()->addSeconds(
                $this->getLifetime()
            )
        );
    }

}
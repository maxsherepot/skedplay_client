<?php

namespace Modules\Users\Services;

use Illuminate\Support\Facades\Cache;

class LoginAttemptsCounter
{
    private const CACHE_KEY = '{ip}:login_attempts';

    public function getCount(string $ip): int
    {
        return Cache::get($this->getCacheKey($ip), 0);
    }

    public function incrementCount(string $ip): void
    {
        $count = Cache::get($this->getCacheKey($ip), 0);
        Cache::put($this->getCacheKey($ip), $count + 1, now()->addMinute());
    }

    private function getCacheKey(string $ip): string
    {
        return str_replace('{ip}', $ip, self::CACHE_KEY);
    }
}
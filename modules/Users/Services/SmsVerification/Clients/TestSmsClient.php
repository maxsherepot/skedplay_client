<?php declare(strict_types=1);

namespace Modules\Users\Services\SmsVerification\Clients;

use Illuminate\Support\Facades\Log;

/**
 * Class TestSmsClient
 */
class TestSmsClient implements SmsClientInterface
{
    /**
     * Send SMS via provider
     * @param string $to
     * @param string $text
     * @return bool
     */
    public function send(string $to, string $text): bool
    {
        Log::info($text);

        return true;
    }
}
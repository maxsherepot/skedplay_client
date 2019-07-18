<?php declare(strict_types=1);

namespace Modules\Users\Services\SmsVerification\Clients;

interface SmsClientInterface
{
    /**
     * Send SMS via provider
     * @param string $to
     * @param string $text
     * @return bool
     */
    public function send(string $to, string $text): bool;
}
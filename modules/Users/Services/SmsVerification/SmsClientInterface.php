<?php

namespace Modules\Users\Services\SmsVerification;

interface SmsClientInterface
{
    /**
     * Send SMS via provider
     * @param string $to
     * @param string $text
     * @return bool
     */
    public function send($to, $text);
}
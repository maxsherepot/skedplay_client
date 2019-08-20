<?php

namespace Modules\Users\Services\Sms\Exceptions;

/**
 * This exception is basic exception
 * Class SmsVerificationException
 */
abstract class VerificationException extends \RuntimeException
{
    abstract public function getErrorCode();
}
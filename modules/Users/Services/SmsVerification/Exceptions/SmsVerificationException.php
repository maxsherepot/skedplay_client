<?php

namespace Modules\Users\Services\SmsVerification\Exceptions;

/**
 * This exception is basic exception
 * Class SmsVerificationException
 */
abstract class SmsVerificationException extends \RuntimeException
{
    abstract public function getErrorCode();
}
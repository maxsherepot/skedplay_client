<?php

namespace Modules\Users\Services\SmsVerification\Exceptions;

/**
 * This exception is being used for input validation exceptions
 * Class ValidateCodeException
 */
class ValidationException extends SmsVerificationException
{
    public function getErrorCode()
    {
        return 300 + min($this->getCode(), 99);
    }
}
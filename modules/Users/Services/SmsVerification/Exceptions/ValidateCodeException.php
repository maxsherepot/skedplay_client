<?php

namespace Modules\Users\Services\SmsVerification\Exceptions;

/**
 * This exception is being used for exceptions during Code validation process.
 * It is NOT used for negative result of validation.
 * Class ValidateCodeException
 */
class ValidateCodeException extends SmsVerificationException
{
    public function getErrorCode()
    {
        return 100 + min($this->getCode(), 99);
    }
}
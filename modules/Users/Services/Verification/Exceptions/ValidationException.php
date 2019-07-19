<?php

namespace Modules\Users\Services\Sms\Exceptions;

/**
 * This exception is being used for input validation exceptions
 * Class ValidateCodeException
 */
class ValidationException extends VerificationException
{
    public function getErrorCode()
    {
        return 300 + min($this->getCode(), 99);
    }
}
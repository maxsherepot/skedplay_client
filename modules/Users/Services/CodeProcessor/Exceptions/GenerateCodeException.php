<?php

namespace Modules\Users\Services\CodeProcessor\Exceptions;

/**
 * This exception is being used for exceptions during Code generating process.
 * Class GenerateCodeException
 */
class GenerateCodeException extends CodeProcessorException
{
    public function getErrorCode()
    {
        return 500 + min($this->getCode(), 99);
    }
}
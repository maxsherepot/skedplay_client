<?php

namespace Modules\Users\Services\CodeProcessor\Exceptions;

/**
 * This exception is basic exception
 * Class CodeProcessorException
 */
abstract class CodeProcessorException extends \RuntimeException
{
    abstract public function getErrorCode();
}
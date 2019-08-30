<?php

namespace Modules\Api\GraphQL\Exceptions;

use Closure;
use GraphQL\Error\Error;
use Illuminate\Validation\ValidationException;
use Nuwave\Lighthouse\Execution\ErrorHandler;

class CustomErrorHandler implements ErrorHandler
{
    /**
     * This function receives all GraphQL errors and may alter them or do something else with them.
     *
     * Always call $next($error) to keep the Pipeline going. Multiple such Handlers may be registered
     * as an array in the config.
     *
     * @param \GraphQL\Error\Error $error
     * @param \Closure $next
     * @return array
     */
    public static function handle(Error $error, Closure $next): array
    {
        $underlyingException = $error->getPrevious();

        if ($underlyingException instanceof ValidationException) {
            /** @var ValidationException $underlyingException */
            $error = new Error(
                $error->message,
                $error->nodes,
                $error->getSource(),
                $error->getPositions(),
                $error->getPath(),
                $underlyingException,
                self::extensionsContent($underlyingException)
            );
        }

        return $next($error);
    }

    /**
     * Return the content that is put in the "extensions" part
     * of the returned error.
     *
     * @param ValidationException $underlyingException
     * @return array
     */
    protected static function extensionsContent(ValidationException $underlyingException): array
    {
        return ['validation' => $underlyingException->errors()];
    }
}
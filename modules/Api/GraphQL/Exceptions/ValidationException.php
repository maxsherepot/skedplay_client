<?php

namespace Modules\Api\GraphQL\Exceptions;

use Exception;
use Nuwave\Lighthouse\Exceptions\RendersErrorsExtensions;

class ValidationException extends Exception implements RendersErrorsExtensions
{
    /**
     * @var
     */
    public $errors;

    /**
     * ValidationException constructor.
     *
     * @param $errors
     * @param string $message
     */
    public function __construct($errors, string $message = "")
    {
        parent::__construct($message);
        $this->errors = $errors;
    }

    /**
     * The category.
     *
     * @var string
     */
    protected $category = 'validation';

    /**
     * Returns true when exception message is safe to be displayed to a client.
     *
     * @return bool
     * @api
     */
    public function isClientSafe(): bool
    {
        return true;
    }

    /**
     * @return string
     */
    public function getCategory(): string
    {
        return 'validation';
    }

    /**
     * @return array
     */
    public function extensionsContent(): array
    {
        return ['errors' => $this->errors];
    }
}
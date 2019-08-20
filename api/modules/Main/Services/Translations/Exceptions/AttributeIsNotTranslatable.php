<?php declare(strict_types=1);

namespace Modules\Main\Services\Translations\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\Model;

class AttributeIsNotTranslatable extends Exception
{
    public static function make(string $key, array $attributes)
    {
        $translatableAttributes = implode(', ', $attributes);
        return new static("Cannot translate attribute `{$key}` as it's not one of the translatable attributes: `$translatableAttributes`");
    }
}
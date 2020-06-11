<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern;

interface Variable extends Replaceable
{
    public function getName(): string;
}

<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern;

interface Replaceable
{
    public function getFrom(): string;

    public function getTo(): string;
}

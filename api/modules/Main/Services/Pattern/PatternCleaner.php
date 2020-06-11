<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern;

final class PatternCleaner
{
    public function clean(string $result): string
    {
        $result = preg_replace('#\s{2,}#', ' ', $result);
        $result = preg_replace('#(\s?,){2,}#', ',', $result);
        $result = trim($result);

        return $result;
    }
}

<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern\Employee;

use Modules\Main\Services\Pattern\PatternCleaner;

final class EmployeePatternParser
{
    /**
     * @var EmployeeVariablesParser
     */
    private $variablesParser;
    /**
     * @var PatternCleaner
     */
    private $cleaner;

    public function __construct(EmployeeVariablesParser $variablesParser, PatternCleaner $cleaner)
    {
        $this->variablesParser = $variablesParser;
        $this->cleaner = $cleaner;
    }

    public function parse(string $pattern, EmployeePatternData $data): string
    {
        $replaceables = $this->variablesParser->parse($pattern, $data);

        $result = $pattern;

        foreach ($replaceables as $replaceable) {
            $result = str_replace($replaceable->getFrom(), $replaceable->getTo(), $result);
        }

        $result = $this->cleaner->clean($result);

        return $result;
    }
}

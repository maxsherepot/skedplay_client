<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern\Club;

use Modules\Main\Services\Pattern\PatternCleaner;

final class ClubPatternParser
{
    /**
     * @var ClubVariablesParser
     */
    private $variablesParser;
    /**
     * @var PatternCleaner
     */
    private $cleaner;

    public function __construct(ClubVariablesParser $variablesParser, PatternCleaner $cleaner)
    {
        $this->variablesParser = $variablesParser;
        $this->cleaner = $cleaner;
    }

    public function parse(string $pattern, ClubPatternData $data): string
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

<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern\Event;

use Modules\Main\Services\Pattern\PatternCleaner;

final class EventPatternParser
{
    /**
     * @var EventVariablesParser
     */
    private $variablesParser;
    /**
     * @var PatternCleaner
     */
    private $cleaner;

    public function __construct(EventVariablesParser $variablesParser, PatternCleaner $cleaner)
    {
        $this->variablesParser = $variablesParser;
        $this->cleaner = $cleaner;
    }

    public function parse(string $pattern, EventPatternData $data): string
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

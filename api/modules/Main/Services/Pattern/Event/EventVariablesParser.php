<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern\Event;

use Modules\Main\Services\Pattern\Replaceable;
use Modules\Main\Services\Pattern\ReplaceableFinder;

final class EventVariablesParser
{
    /**
     * @var ReplaceableFinder
     */
    private $replaceableFinder;

    public function __construct(ReplaceableFinder $replaceableFinder)
    {
        $this->replaceableFinder = $replaceableFinder;
    }

    /**
     * @param string $pattern
     * @param EventPatternData $data
     * @return Replaceable[]
     */
    public function parse(string $pattern, EventPatternData $data): array
    {
        $variableResolver = $this->getVariableResolver($data);

        $variables = $this->replaceableFinder->getVariables($pattern, $variableResolver);

        $related = $this->replaceableFinder->getRelated($pattern, $variables);

        return array_merge(array_values($variables), $related);
    }

    private function getVariableResolver(EventPatternData $data): callable
    {
        return function(string $variableName, $delimiter = ', ') use ($data) : ?string {
            if ($variableName === 'canton') {
                return optional($data->getCanton())->name;
            }

            if ($variableName === 'city') {
                return optional($data->getCity())->name;
            }

            if ($variableName === 'types') {
                return $data->getTypes()->pluck('name')->implode($delimiter) ?: null;
            }

            return null;
        };
    }
}

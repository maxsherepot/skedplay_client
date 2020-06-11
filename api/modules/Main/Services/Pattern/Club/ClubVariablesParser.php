<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern\Club;

use Modules\Main\Services\Pattern\Replaceable;
use Modules\Main\Services\Pattern\ReplaceableFinder;

final class ClubVariablesParser
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
     * @param ClubPatternData $data
     * @return Replaceable[]
     */
    public function parse(string $pattern, ClubPatternData $data): array
    {
        $variableResolver = $this->getVariableResolver($data);

        $variables = $this->replaceableFinder->getVariables($pattern, $variableResolver);

        $related = $this->replaceableFinder->getRelated($pattern, $variables);

        return array_merge(array_values($variables), $related);
    }

    private function getVariableResolver(ClubPatternData $data): callable
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

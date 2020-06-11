<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern;

use Illuminate\Support\Collection;

final class ReplaceableFinder
{
    public function getVariables(string $pattern, callable $resolveVariableValue): array
    {
        $variables = $this->getSimpleVariables($pattern, $resolveVariableValue);

        $arrayVariables = $this->getArrayVariables($pattern, $resolveVariableValue);

        return $variables->merge($arrayVariables)->toArray();
    }

    /**
     * @param string $pattern
     * @param SimpleVariable[] $variables
     * @return array
     */
    public function getRelated(string $pattern, array $variables): array
    {
        preg_match_all('/{.+:\w+}/U', $pattern, $relatedMatches);

        [$related] = $relatedMatches;

        $related = collect($related ?? [])
            ->map(function (string $variable) use ($variables) {
                $cleanRelated = str_replace(['{', '}'], '', $variable);

                [$relatedText, $variableName] = explode(':', $cleanRelated);

                $variable = $variables[$variableName] ?? null;

                if (!$variable) {
                    return null;
                }

                return new Related(
                    $relatedText,
                    $variable
                );
            })
            ->filter()
            ->values();

        return $related->toArray();
    }

    private function getSimpleVariables(string $pattern, callable $resolveVariableValue): Collection
    {
        preg_match_all('/#\w+#/U', $pattern, $variableMatches);

        [$variables] = $variableMatches;

        $variables = collect($variables ?? [])->mapWithKeys(function (string $variable) use ($resolveVariableValue) {
            $cleanVariable = str_replace('#', '', $variable);

            $cleanVariableExploded = explode(':', $cleanVariable);
            $variableName = $cleanVariableExploded[0];
            $defaultValue = $cleanVariableExploded[1] ?? null;

            return [
                $variableName => new SimpleVariable(
                    $variableName,
                    $resolveVariableValue($variableName),
                    $defaultValue
                )
            ];
        });

        return $variables;
    }

    private function getArrayVariables(string $pattern, callable $resolveVariableValue): Collection
    {
        preg_match_all('/\[.+\]/U', $pattern, $arrayVariableMatches);

        [$arrayVariables] = $arrayVariableMatches;

        $arrayVariables = collect($arrayVariables ?? [])->mapWithKeys(function (string $variable) use ($resolveVariableValue) {
            $cleanVariable = str_replace(['[', ']'], '', $variable);

            $cleanVariableExploded = explode(':', $cleanVariable);
            $variableName = $cleanVariableExploded[0];
            $defaultDelimiter = ', ';
            $delimiter = $cleanVariableExploded[1] ?? null;
            $defaultValue = $cleanVariableExploded[2] ?? null;

            return [
                $variableName => new ArrayVariable(
                    $variableName,
                    $resolveVariableValue($variableName, $delimiter ?? $defaultDelimiter),
                    $delimiter,
                    $defaultValue
                )
            ];
        });

        return $arrayVariables;
    }
}

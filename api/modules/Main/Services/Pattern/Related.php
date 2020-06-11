<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern;

final class Related implements Replaceable
{
    /**
     * @var string
     */
    private $relatedText;
    /**
     * @var Variable
     */
    private $variable;

    public function __construct(string $relatedText, Variable $variable)
    {
        $this->relatedText = $relatedText;
        $this->variable = $variable;
    }

    public function getFrom(): string
    {
        return "{{$this->relatedText}:{$this->variable->getName()}}";
    }

    public function getTo(): string
    {
        $variableValue = $this->variable->getTo();

        if (!$variableValue) {
            return "";
        }

        return $this->relatedText;
    }
}

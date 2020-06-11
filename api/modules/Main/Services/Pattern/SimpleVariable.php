<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern;

final class SimpleVariable implements Variable
{
    /**
     * @var string
     */
    private $name;
    /**
     * @var string|null
     */
    private $value;
    /**
     * @var string|null
     */
    private $defaultValue;

    public function __construct(string $name, ?string $value = null, ?string $defaultValue = null)
    {
        $this->name = $name;
        $this->value = $value;
        $this->defaultValue = $defaultValue;
    }


    public function getFrom(): string
    {
        if ($this->defaultValue) {
            return "#$this->name:$this->defaultValue#";
        }

        return "#{$this->name}#";
    }

    public function getTo(): string
    {
        return $this->value ?? $this->defaultValue ?? '';
    }

    public function getName(): string
    {
        return $this->name;
    }
}

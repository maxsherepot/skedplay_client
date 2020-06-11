<?php declare(strict_types=1);

namespace Modules\Main\Services\Pattern;

final class ArrayVariable implements Variable
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
    private $delimiter;
    /**
     * @var string|null
     */
    private $defaultValue;

    public function __construct(string $name, ?string $value = null, ?string $delimiter = null, ?string $defaultValue = null)
    {
        $this->name = $name;
        $this->value = $value;
        $this->delimiter = $delimiter;
        $this->defaultValue = $defaultValue;
    }

    public function getFrom(): string
    {
        if (!$this->delimiter) {
            return "[$this->name]";
        }

        if ($this->defaultValue) {
            return "[$this->name:$this->delimiter:$this->defaultValue]";
        }

        return "[$this->name:$this->delimiter]";
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

<?php

namespace App\Events;

use App\Models\ViewedEntity;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ResourceViewedEvent
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;
    /**
     * @var string
     */
    private $model;
    /**
     * @var int
     */
    private $id;

    /**
     * Create a new event instance.
     *
     * @param string $model
     * @param int    $id
     */
    public function __construct(string $model, int $id)
    {
        $this->model = $model;
        $this->id = $id;
    }

    /**
     * @return ViewedEntity
     */
    public function getEntity(): ViewedEntity
    {
        return $this->model::find($this->id);
    }
}

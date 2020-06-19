<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class EventCount extends Model
{
    protected $fillable = ['model_type', 'model_id', 'event', 'count'];

    public $timestamps = false;

    protected $appends = [
        'event_display'
    ];

    public const ENTITIES = [
        'employee',
        'club',
        'event',
    ];

    public const EVENT_VIEW = 'view';
    public const EVENT_ROUTE = 'route';
    public const EVENT_PHONE = 'phone';
    public const EVENT_CALL = 'call';
    public const EVENT_LINK = 'link';
    public const EVENT_FAVORITE = 'favorite';
    public const EVENT_UNFAVORITE = 'unfavorite';
    public const EVENT_SUBSCRIBE = 'subscribe';

    public const EVENTS = [
        self::EVENT_VIEW => 'View',
        self::EVENT_ROUTE => 'Show route',
        self::EVENT_PHONE => 'Show phone',
        self::EVENT_CALL => 'Call phone',
        self::EVENT_LINK => 'Copy link',
        self::EVENT_FAVORITE => 'Add to favorite',
        self::EVENT_UNFAVORITE => 'Remove from favorite',
        self::EVENT_SUBSCRIBE => 'Subscribe',
    ];

    public function getEventDisplayAttribute(): string
    {
        return self::EVENTS[$this->event] ?? $this->event;
    }

    public function model(): MorphTo
    {
        return $this->morphTo();
    }
}

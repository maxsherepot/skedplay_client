<?php

namespace Modules\Chat\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Chat\Contracts\RealtimeInterface;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Message extends Model implements RealtimeInterface, HasMedia
{
    use HasMediaTrait, SoftDeletes;

    const ATTACHMENTS_COLLECTION = 'attachments';

    protected $fillable = [
        'chat_id',
        'text',
        'from_client',
    ];

    public function registerMediaCollections()
    {
        $this->addMediaCollection(self::ATTACHMENTS_COLLECTION);
    }

    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chat_id', 'id');
    }

    public function getCentrifugeChannel() : string
    {
        return '$CHAT_' . $this->receiver_id . '_' . $this->creator_id ;
    }
}

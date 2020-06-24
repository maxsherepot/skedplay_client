<?php

namespace Modules\Chat\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class AdminChatMessage extends Model
{
    use InteractsWithMedia;

    const ATTACHMENTS_COLLECTION = 'attachments';

    protected $fillable = [
        'chat_id',
        'text',
        'from_admin',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::ATTACHMENTS_COLLECTION);
    }

    /**
     * @return BelongsTo
     */
    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class, 'chat_id', 'id');
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(Media::class, 'model_id', 'id')->where('collection_name', self::ATTACHMENTS_COLLECTION);
    }
}

<?php

namespace Modules\Chat\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class AdminChatMessage extends Model
{
    use HasMediaTrait;

    const ATTACHMENTS_COLLECTION = 'attachments';

    protected $fillable = [
        'chat_id',
        'text',
        'from_admin',
    ];

    public function registerMediaCollections()
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

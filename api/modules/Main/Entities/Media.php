<?php


namespace Modules\Main\Entities;


use App\Models\ViewedEntity;
use App\Models\ViewedEntityDefault;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Media extends \Spatie\MediaLibrary\Models\Media implements ViewedEntity
{

    public function view(): void
    {
        if (!$this->viewRelation) {
            $this->viewRelation()->create(['seen' => 1]);
            return;
        }

        if (!$this->viewRelation->seen) {
            $this->viewRelation->seen = 1;
            $this->viewRelation->save();
        }
    }

    public function isViewed(): bool
    {
        return $this->viewRelation && $this->viewRelation->seen === 1;
    }

    public function viewRelation(): HasOne
    {
        return $this->hasOne(MediaView::class, 'media_id', 'id');
    }
}

<?php declare(strict_types=1);

namespace Modules\Users\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Main\Entities\Event;
use Modules\Main\Services\Location\HasLocation;
use Modules\Main\Services\Location\Locationable;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Club extends Model implements HasMedia, HasLocation
{
    use Locationable, HasMediaTrait, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'website',
        'address',
        'phone',
        'description',
        'user_id',
    ];

    public function registerMediaCollections()
    {
        $this->addMediaCollection('logo');
        $this->addMediaCollection('photos');
        $this->addMediaCollection('videos');
    }

    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('medium')
            ->width(420)
            ->height(275);

        $this->addMediaConversion('large')
            ->width(535)
            ->height(785);
    }

    /**
     * @return BelongsToMany
     */
    public function girls(): BelongsToMany
    {
        return $this->belongsToMany(Girl::class, 'club_user');
    }

    /**
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return MorphMany
     */
    public function events(): MorphMany
    {
        return $this->morphMany(Event::class, 'eventable');
    }
}

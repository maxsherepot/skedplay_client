<?php

namespace Modules\Common\Entities\Traits;

use Modules\Common\Entities\Favorite;

trait Favoriteable
{
    public static function bootFavoriteable()
    {
        static::deleting(function ($model) {
            $model->removeFavorites();
        });
    }

    public function scopeWhereFavoritedBy($query, $userId = null)
    {
        if (is_null($userId)) {
            $userId = $this->loggedInUserId();
        }

        return $query->whereHas('favorites', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        });
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoriteable');
    }

    public function favoriteRelation()
    {
        return $this->morphOne(Favorite::class, 'favoriteable');
    }

    public function favorite($userId = null)
    {
        if (is_null($userId)) {
            $userId = $this->loggedInUserId();
        }

        if ($userId) {
            $favorite = $this->favorites()
                ->where('user_id', $userId)
                ->first();

            if ($favorite) return;

            $favorite = new Favorite();
            $favorite->user_id = $userId;
            $this->favorites()->save($favorite);
        }
    }

    public function unfavorite($userId = null)
    {
        if (is_null($userId)) {
            $userId = $this->loggedInUserId();
        }

        if ($userId) {
            $favorite = $this->favorites()
                ->where('user_id', $userId)
                ->first();

            if (!$favorite) {
                return;
            }

            $favorite->delete();
        }
    }

    public function favorited($userId = null)
    {
        if (is_null($userId)) {
            $userId = $this->loggedInUserId();
        }

        return (bool)$this->favorites()
            ->where('user_id', $userId)
            ->count();
    }

    public function loggedInUserId()
    {
        return auth()->id();
    }

    public function getFavoritedAttribute()
    {
        return $this->favorited();
    }

    public function removeFavorites()
    {
        Favorite::where('favoriteable_type', $this->morphClass)->where('favoriteable_id', $this->id)->delete();
    }
}
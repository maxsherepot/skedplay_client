<?php

namespace Modules\Api\GraphQL\Type;

use Spatie\MediaLibrary\Models\Media;

class MediaType
{
    /**
     * @param Media $rootValue
     * @return string
     */
    function getThumbUrl(Media $rootValue)
    {
        return $rootValue->getFullUrl('thumb');
    }

    /**
     * @param Media $rootValue
     * @return string
     */
    function getUrl(Media $rootValue)
    {
        return $rootValue->getFullUrl();
    }
}
<?php

namespace Modules\Api\GraphQL\Type;

use Illuminate\Support\Facades\DB;
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
    function getBigThumbUrl(Media $rootValue)
    {
        return $rootValue->getFullUrl('big_thumb');
    }

    /**
     * @param Media $rootValue
     * @return string
     */
    function getUrl(Media $rootValue)
    {
        return $rootValue->getFullUrl();
    }

    /**
     * @param Media $rootValue
     * @return string
     */
    function getMimeType(Media $rootValue)
    {
        return $rootValue->mime_type;
    }

    /**
     * @param Media $rootValue
     * @return string
     */
    function getCustomProperties(Media $rootValue)
    {
        return json_encode($rootValue->custom_properties);
    }

    /**
     * @param Media $rootValue
     * @return string
     */
    function getModelType(Media $rootValue)
    {
        return $rootValue->model_type;
    }

    /**
     * @param Media $rootValue
     * @return int
     */
    function getModelId(Media $rootValue)
    {
        return (int) $rootValue->model_id;
    }

    /**
     * @param Media $rootValue
     * @return int
     */
    function getCollectionName(Media $rootValue)
    {
        return $rootValue->collection_name;
    }

    /**
     * @param Media $rootValue
     * @return mixed
     */
    function getCreatedAtDateTime(Media $rootValue)
    {
        return DB::table('media')
            ->find($rootValue->id)->created_at;
    }
}

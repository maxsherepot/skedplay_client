<?php

namespace Modules\Api\GraphQL\Mutations;

use Spatie\MediaLibrary\Models\Media;

class ClearMediaCollection
{
    /**
     * @param mixed $root
     * @param mixed[] $args
     * @return string
     * @throws \Exception
     */
    public function __invoke($root, array $args): string
    {
        Media::query()
            ->where('collection_name', $args['collection_name'])
            ->where('model_type', $args['model_type'])
            ->where('model_id', $args['model_id'])
            ->delete();

        return 'ok';
    }
}

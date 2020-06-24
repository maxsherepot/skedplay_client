<?php

namespace Modules\Api\GraphQL\Mutations;

use Spatie\MediaLibrary\MediaCollections\Models\Media;

class DeleteMedia
{
    /**
     * @param mixed $root
     * @param mixed[] $args
     * @return string
     * @throws \Exception
     */
    public function __invoke($root, array $args): string
    {
        /** @var Media $media */
        $media = Media::find($args['id']);
        $response = $media;
        if ($media) {
            $media->delete();

            return $response->id;
        }
    }
}

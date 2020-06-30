<?php

namespace Modules\Api\GraphQL\Mutations;

use Spatie\MediaLibrary\Models\Media;

class DeleteMediaMass
{
    /**
     * @param mixed $root
     * @param mixed[] $args
     * @return string
     * @throws \Exception
     */
    public function __invoke($root, array $args): string
    {
        Media::whereIn('id', $args['ids'])->delete();

        return 'ok';
    }
}

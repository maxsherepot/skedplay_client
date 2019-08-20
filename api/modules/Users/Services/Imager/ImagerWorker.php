<?php

namespace Modules\Users\Services\Imager;

class ImagerWorker
{
    protected $imager;

    public function __construct(RootImager $imager)
    {
        $this->imager = $imager;
    }

    /**
     * @return null|string
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function random()
    {
        return $this->imager->random()->getImagePath();
    }

    /**
     * @return RootImager
     */
    public function imager()
    {
        return $this->imager;
    }
}
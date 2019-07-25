<?php

namespace Modules\Users\Services\Imager;

use Storage;

class RootImager
{
    /** @var string */
    protected $store_from = 'seeder';

    /** @var string */
    protected $store_to = 'public';

    /** @var bool */
    protected $store_publicly = true;

    /** @var string */
    protected $image_prefix = 'feature';

    /** @var \Illuminate\Support\Collection */
    protected $images;

    /** @var string|null */
    protected $image;

    public function __construct()
    {
        $this->images = collect(Storage::files($this->store_from));
    }

    /**
     * @return $this
     */
    public function random()
    {
        $this->image = $this->images->random();
        return $this;
    }

    /**
     * @param $position
     * @return $this
     */
    public function getCurrentFile($position)
    {
        $this->image = $this->images[$position];
        return $this;
    }

    /**
     * @return string|null
     */
    public function getImagePath()
    {
        return $this->image;
    }

    /**
     * @return int
     */
    public function count()
    {
        return $this->images->count();
    }

}
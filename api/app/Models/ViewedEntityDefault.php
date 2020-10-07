<?php

namespace App\Models;


trait ViewedEntityDefault
{
    public function view(): void
    {
        $this->seen = 1;
        $this->save();
    }

    public function isViewed(): bool
    {
        return $this->seen === 1;
    }
}

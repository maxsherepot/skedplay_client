<?php

namespace App\Models;

interface ViewedEntity
{
    public function view(): void;

    public function isViewed(): bool;
}

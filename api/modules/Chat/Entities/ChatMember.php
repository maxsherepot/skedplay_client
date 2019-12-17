<?php

namespace Modules\Chat\Entities;


interface ChatMember
{
    public function isClient(): bool;
    public function isEmployee(): bool;
}
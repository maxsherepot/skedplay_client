<?php


namespace Modules\Chat\Contracts;


interface RealtimeInterface
{
    public function  getCentrifugeChannel() : string;
}
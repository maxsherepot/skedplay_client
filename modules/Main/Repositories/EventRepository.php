<?php declare(strict_types=1);

namespace Modules\Main\Repositories;

use Illuminate\Support\Str;
use Modules\Main\Entities\Event;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class EventRepository
{
    /**
     * @param Event $event
     * @param UploadedFile $file
     * @param $collection
     * @return void
     */
    public function saveFile(Event $event, UploadedFile $file, $collection = 'main_photo')
    {
        $fileName = $file->getClientOriginalName();
        $extension = Str::slug($file->getClientOriginalExtension());
        $storeName = md5($fileName . time()) . '.' . $extension;

        $event->addMedia($file)
            ->usingName($storeName)
            ->toMediaCollection($collection, 'media');
    }
}
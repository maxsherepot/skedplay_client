<?php declare(strict_types=1);

namespace Modules\Users\Repositories\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Modules\Main\Entities\Event;
use Modules\Users\Entities\Club;
use Modules\Users\Entities\User;
use Symfony\Component\HttpFoundation\File\UploadedFile;

trait Mediable
{
    protected $diskName = 'media';

    /**
     * Save club attachments
     * @param Model $model
     * @param $files
     * @param string $collection
     */
    public function saveAttachments(Model $model, $files, $collection = 'photos')
    {
        foreach ($files as $file) {
            $this->saveFile($model, $file, $collection);
        }
    }

    /**
     * @param Model $model
     * @param UploadedFile $file
     * @param $collection
     * @return void
     */
    public function saveFile(Model $model, UploadedFile $file, $collection)
    {
        $fileName = $file->getClientOriginalName();
        $extension = Str::slug($file->getClientOriginalExtension());
        $storeName = md5($fileName . time()) . '.' . $extension;

        /** @var Club|User|Event $model */
        $model->addMedia($file)
            ->usingName($storeName)
            ->toMediaCollection($collection, $this->diskName);
    }
}
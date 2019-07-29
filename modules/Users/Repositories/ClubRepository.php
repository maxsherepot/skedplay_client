<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Modules\Users\Entities\Club;
use Modules\Users\Entities\User;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ClubRepository
{
    /**
     * @param User $user
     * @param Collection $collection
     * @return Club
     */
    public function store(User $user, Collection $collection): Club
    {
        $data = $collection->toArray();
        $data['user_id'] = $user->id;

        return Club::create($data);
    }

    /**
     * @param Club $club
     * @param Collection $collection
     * @return bool
     */
    public function update(Club $club, Collection $collection): bool
    {
        return $club->update($collection->toArray());
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return Club::findOrFail($id);
    }

    /**
     * Save club attachments
     * @param Club $club
     * @param $files
     * @param string $collection
     */
    public function saveAttachments(Club $club, $files, $collection = 'photos')
    {
        foreach ($files as $file) {
            $this->saveFile($club, $file, $collection);
        }
    }

    /**
     * @param Club $club
     * @param UploadedFile $file
     * @param $collection
     * @return void
     */
    public function saveFile(Club $club, UploadedFile $file, $collection)
    {
        $fileName = $file->getClientOriginalName();
        $extension = Str::slug($file->getClientOriginalExtension());
        $storeName = md5($fileName . time()) . '.' . $extension;

        $club->addMedia($file)
            ->usingName($storeName)
            ->toMediaCollection($collection, 'media');
    }
}
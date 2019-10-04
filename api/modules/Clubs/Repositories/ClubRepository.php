<?php declare(strict_types=1);

namespace Modules\Users\Repositories;

use Illuminate\Support\Collection;
use Modules\Clubs\Entities\Club;
use Modules\Common\Contracts\HasMediable;
use Modules\Common\Entities\ClubScheduleWork;
use Modules\Common\Traits\Mediable;
use Modules\Users\Entities\User;
use Modules\Users\Entities\Role;

class ClubRepository implements HasMediable
{
    use Mediable;

  /**
   * @param User $user
   * @param Collection $collection
   * @return \Illuminate\Database\Eloquent\Model
   * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\DiskDoesNotExist
   * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileDoesNotExist
   * @throws \Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileIsTooBig
   */
    public function store(User $user, Collection $collection): \Illuminate\Database\Eloquent\Model
    {
        $inputs = $collection->toArray();

        $inputs['phones'] = json_encode([
            $inputs['phone']
        ]);

        /** @var Club $club */
        $club = $user->clubs()->create($inputs);

        $moderator = $this->createModerator($collection);
        $club->admin()->associate($moderator);
        $club->save();

        $club->addMedia($collection->get('logotype'))
            ->toMediaCollection(Club::LOGO_COLLECTION);

        return $club;
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
     * @param Collection $collection
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function storeSchedule(Collection $collection): \Illuminate\Database\Eloquent\Model
    {
        return ClubScheduleWork::create($collection->toArray());
    }

    public function createModerator(Collection $collection) {
        $data = $collection->get('moderator');
        $data['name'] = $data['first_name'] . " " . $data['last_name'];
        $data['password'] = bcrypt(\Str::random(6));

      /** @var User $moderator */
      $moderator = User::create($data);
        $moderator->attachRole(Role::MODERATOR);

        return $moderator;
    }
}

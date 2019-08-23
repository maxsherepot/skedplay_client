<?php

namespace Modules\Events\database\seeders;

use Illuminate\Database\Seeder;
use Modules\Clubs\Entities\Club;
use Modules\Events\Entities\Event;
use Modules\Events\Entities\EventType;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;
use Modules\Users\Services\Imager\ImagerWorker;
use Modules\Users\Services\Imager\Varieties\EventImager;

class EventTableSeeder extends Seeder
{
    private $events_imager;

    protected $faker;

    public function __construct()
    {
        $this->events_imager = (new ImagerWorker(new EventImager()))->imager();
        $this->faker = \Faker\Factory::create();

    }

    /**
     * @throws \Exception
     */
    public function run()
    {
        foreach (User::whereRoleIs(Role::EMPLOYEE_OWNER)->get() as $user) {
            $this->createEvents($user);
        }

        foreach (Club::all() as $club) {
            $this->createEvents($club);
        }
    }

    /**
     * @param $owner
     * @throws \Exception
     */
    protected function createEvents($owner)
    {
        for ($i = 0; $i <= random_int(5, 20); $i++) {
            $this->createEvent($owner);
        }
    }

    protected function createEvent($owner)
    {
        $event = new Event([
            'title'       => $this->faker->text,
            'description' => $this->faker->text(1000)
        ]);

        $club = is_a($owner, Club::class) ? $owner : Club::inRandomOrder()->first();

        $event->type()->associate(EventType::inRandomOrder()->first());
        $event->club()->associate($club);
        $event->owner()->associate($owner);

        $event->save();

        $this->addAttachments($event);
    }

    public function addAttachments(Event $event)
    {
        collect(range(0, 3))
            ->map(function () use ($event) {
                $pathToFile = $this->events_imager->random()->getImagePath();

                $event->addMedia(storage_path('app/'.$pathToFile))
                    ->preservingOriginal()
                    ->toMediaCollection(Event::MAIN_PHOTO_COLLECTION, 'media');
            });
    }
}

<?php

namespace Modules\Events\database\seeders;

use Illuminate\Database\Seeder;
use Modules\Clubs\Entities\Club;
use Modules\Events\Entities\Event;
use Modules\Events\Entities\EventType;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;

class EventTableSeeder extends Seeder
{

    protected $faker;

    public function __construct()
    {
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
    }
}

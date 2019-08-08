<?php

namespace Modules\Girls\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Modules\Clubs\Entities\Club;
use Modules\Common\Database\Seeders\CommonableSeeder;
use Modules\Girls\Entities\Girl;
use Modules\Girls\Entities\GirlType;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;

class GirlTableSeeder extends Seeder
{
    use CommonableSeeder;

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
        foreach (User::whereRoleIs(Role::GIRL_OWNER)->get() as $user) {
            $this->createGirl($user);
        }

        foreach (Club::all() as $club) {
            for ($i = 0; $i <= random_int(1, 4); $i++) {
                $this->createGirl($club);
            }
        }
    }

    /**
     * @param $owner
     * @return Girl
     * @throws \Exception
     */
    public function createGirl($owner)
    {
        $girl = new Girl([
            'first_name'  => $this->faker->firstName,
            'last_name'   => $this->faker->lastName,
            'gender'      => $this->faker->randomElement(User::REGISTER_GENDERS),
            'age'         => random_int(20, 50),
            'description' => $this->faker->text,
            'text'        => $this->faker->text(1000),

            'address' => $this->faker->address,
            'lat'     => $this->faker->latitude,
            'lng'     => $this->faker->longitude
        ]);

        $girl->type()->associate(GirlType::inRandomOrder()->first());
        $girl->owner()->associate($owner);
        $girl->save();

        $this->attachPrices($girl);
        $this->attachServices($girl);

        return $girl;
    }
}

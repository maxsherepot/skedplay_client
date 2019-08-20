<?php

namespace Modules\Employees\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Clubs\Entities\Club;
use Modules\Common\Database\Seeders\CommonableSeeder;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeRaceType;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;

class EmployeeTableSeeder extends Seeder
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
        foreach (User::whereRoleIs(Role::EMPLOYEE_OWNER)->get() as $user) {
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
     * @return Employee
     * @throws \Exception
     */
    public function createGirl($owner)
    {
        $girl = new Employee([
            'first_name'  => $this->faker->firstName,
            'last_name'   => $this->faker->lastName,
            'gender'      => $this->faker->randomElement(User::REGISTER_GENDERS),
            'age'         => random_int(20, 50),
            'description' => $this->faker->text,
            'text'        => $this->faker->text(1000),
            'type'        => random_int(1, 3),
            'address'     => $this->faker->address,
            'lat'         => $this->faker->latitude,
            'lng'         => $this->faker->longitude
        ]);

        $girl->race_type()->associate(EmployeeRaceType::inRandomOrder()->first());
        $girl->owner()->associate($owner);
        $girl->save();

        $this->attachPrices($girl);
        $this->attachServices($girl);

        return $girl;
    }
}

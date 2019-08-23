<?php

namespace Modules\Employees\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Clubs\Entities\Club;
use Modules\Common\Database\Seeders\CommonableSeeder;
use Modules\Employees\Entities\Employee;
use Modules\Employees\Entities\EmployeeRaceType;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;
use Modules\Users\Services\Imager\ImagerWorker;
use Modules\Users\Services\Imager\Varieties\EventImager;

class EmployeeTableSeeder extends Seeder
{

    use CommonableSeeder;

    /**
     * @var \Modules\Users\Services\Imager\RootImager
     */
    private $events_imager;

    protected $faker;

    public function __construct()
    {
        $this->events_imager = (new ImagerWorker(new EventImager()))->imager();
        $this->faker         = \Faker\Factory::create();
    }

    /**
     * @throws \Exception
     */
    public function run()
    {
        foreach (User::whereRoleIs(Role::EMPLOYEE_OWNER)->get() as $user) {
            $this->createEmployee($user);
        }

        foreach (Club::all() as $club) {
            for ($i = 0; $i <= random_int(10,15); $i++) {
                $this->createEmployee($club);
            }
        }
    }

    /**
     * @param $owner
     * @return Employee
     * @throws \Exception
     */
    public function createEmployee($owner)
    {
        $employee = new Employee([
            'first_name'  => $this->faker->firstName,
            'last_name'   => $this->faker->lastName,
            'gender'      => $this->faker->randomElement(User::REGISTER_GENDERS),
            'age'         => random_int(20, 50),
            'description' => $this->faker->text,
            'text'        => $this->faker->text(1000),
            'type'        => random_int(1, 3),
            'address'     => $this->faker->address,
            'lat'         => $this->faker->latitude,
            'lng'         => $this->faker->longitude,
            'isVip'       => $this->faker->boolean
        ]);

        $employee->race_type()->associate(EmployeeRaceType::inRandomOrder()->first());
        $employee->owner()->associate($owner);
        $employee->save();

        $this->attachPrices($employee);
        $this->attachServices($employee);

        $this->addAttachments($employee);

        return $employee;
    }

    public function addAttachments(Employee $employee)
    {
        collect(range(0, 3))
            ->map(function () use ($employee) {
                $pathToFile = $this->events_imager->random()->getImagePath();

                $employee->addMedia(storage_path('app/'.$pathToFile))
                    ->preservingOriginal()
                    ->toMediaCollection(Employee::PHOTO_COLLECTION, 'media');
            });
    }
}

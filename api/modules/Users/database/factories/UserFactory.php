<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Modules\Users\Entities\User;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(\Modules\Users\Entities\User::class, function (Faker $faker) {
    $key = $faker->name;

    return [
        'name'     => $key,
        'gender'   => $this->faker->randomElement(User::REGISTER_GENDERS),
        'birthday' => $this->faker->date($format = 'Y-m-d', $max = '2003-05-05'),
        'email'    => $key.'@site.com',
        'phone'    => $this->faker->unique()->phoneNumber,
        'password' => 'password',
    ];

});

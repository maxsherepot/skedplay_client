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

$factory->state(\Modules\Users\Entities\User::class, 'club_owner', function (Faker $faker) {
    return [
        'account_type' => User::ACCOUNT_CLUB_OWNER,
        'club_type'    => $faker->randomElement(['Club', 'Studio']),
    ];
});

$factory->state(\Modules\Users\Entities\User::class, 'model', [
    'account_type' => User::ACCOUNT_MODEL,
]);

$factory->state(\Modules\Users\Entities\User::class, 'client', [
    'account_type' => User::ACCOUNT_CLIENT,
]);

$factory->define(\Modules\Users\Entities\User::class, function (Faker $faker) {
    $genders = [
        'male',
        'female',
    ];

    return [
        'email'      => $faker->unique()->safeEmail,
        'first_name' => $faker->firstName,
        'last_name'  => $faker->lastName,
        'gender'     => $faker->randomElement($genders),
        'birthday'   => $faker->date($format = 'Y-m-d', $max = '2003-05-05'),
        'phone'      => $faker->phoneNumber,
        'password'   => 'password',
    ];
    
})->afterCreating(\Modules\Users\Entities\User::class, function (User $user) {
    $user->attachRole($user->account_type);
});
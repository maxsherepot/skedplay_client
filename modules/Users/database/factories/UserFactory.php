<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Modules\Users\Entities\Girl;
use Modules\Users\Entities\User;
use Modules\Users\Services\Imager\ImagerWorker;
use Modules\Users\Services\Imager\Varieties\ModelImager;

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

$factory->state(\Modules\Users\Entities\User::class, 'client', [
    'account_type' => User::ACCOUNT_CLIENT,
]);

$factory->define(\Modules\Users\Entities\User::class, function (Faker $faker) {
    return [
        'email'      => $faker->unique()->safeEmail,
        'first_name' => $faker->firstName,
        'last_name'  => $faker->lastName,
        'gender'     => $faker->randomElement([
            User::GENDER_MALE,
            User::GENDER_FEMALE,
        ]),
        'birthday'   => $faker->date($format = 'Y-m-d', $max = '2003-05-05'),
        'phone'      => $faker->phoneNumber,
        'password'   => 'password',
    ];

})->afterCreating(\Modules\Users\Entities\User::class, function (User $user) {
    $user->attachRole($user->account_type);

//    $imager = (new ImagerWorker(new ModelImager()))->imager();
//
//    collect(range(0, 6))
//        ->map(function () use ($user, $imager) {
//            $pathToFile = $imager->random()->getImagePath();
//
//            $user->addMedia(storage_path('app/' . $pathToFile))
//                ->preservingOriginal()
//                ->toMediaCollection('photos', 'media');
//        });
});

$factory->define(\Modules\Users\Entities\Girl::class, function (Faker $faker) {
    return [
        'email'        => $faker->unique()->safeEmail,
        'first_name'   => $faker->firstName,
        'last_name'    => $faker->lastName,
        'gender'       => $faker->randomElement([
            User::GENDER_MALE,
            User::GENDER_FEMALE,
        ]),
        'birthday'     => $faker->date($format = 'Y-m-d', $max = '2003-05-05'),
        'phone'        => $faker->phoneNumber,
        'password'     => 'password',
        'account_type' => User::ACCOUNT_GIRL,
        'type'         => $faker->randomElement(Girl::GIRL_TYPES),
        'vip'          => (bool)rand(0, 1),
    ];

})->afterCreating(\Modules\Users\Entities\Girl::class, function (Girl $girl) {
    $girl->attachRole($girl->account_type);

//    $imager = (new ImagerWorker(new ModelImager()))->imager();
//
//    collect(range(0, 6))
//        ->map(function () use ($user, $imager) {
//            $pathToFile = $imager->random()->getImagePath();
//
//            $girl->addMedia(storage_path('app/' . $pathToFile))
//                ->preservingOriginal()
//                ->toMediaCollection('photos', 'media');
//        });
});
